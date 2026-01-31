import { NextResponse } from "next/server";
import connectDb from "@/app/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import bcrypt from "bcrypt"
import User from "@/models/user.model";
import Business from "@/models/business.model";

// GET - Fetch current user/business data for settings
export async function GET(req) {
    try {
        await connectDb()
        const session = await getServerSession(authOptions)
        if (!session) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
        }

        const isOwner = session.user.role === "Owner"
        const userId = session.user.id

        let profileData = {}
        let businessData = {}

        if (isOwner) {
            // Fetch business (owner) data
            const business = await Business.findById(userId).select('-password')
            if (business) {
                profileData = {
                    name: business.ownerName || '',
                    email: business.email || '',
                    role: 'Owner'
                }
                businessData = {
                    businessName: business.businessName || '',
                    industry: business.industry || '',
                    address: business.address || '',
                    city: business.city || '',
                    country: business.country || '',
                    website: business.website || ''
                }
            }
        } else {
            // Fetch user (admin/staff) data
            const user = await User.findById(userId).select('-password')
            if (user) {
                profileData = {
                    name: user.name || '',
                    email: user.email || '',
                    role: user.role || ''
                }
            }
        }

        return NextResponse.json({ profile: profileData, business: businessData }, { status: 200 })
    } catch (error) {
        console.error('Settings GET error:', error)
        return NextResponse.json({ message: "Internal server error" }, { status: 500 })
    }
}

export async function PATCH(req) {
    try {
        await connectDb()
        const session = await getServerSession(authOptions)
        if (!session) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
        }

        const { searchParams } = new URL(req.url)
        const account = searchParams.get('account')

        const body = await req.json()
        const isOwner = session.user.role === "Owner"
        const userId = session.user.id

        if (account === "password") {
            const { currentPassword, newPassword, confirmPassword } = body

            let user;
            if (isOwner) {
                user = await Business.findById(userId).select('+password');
            } else {
                user = await User.findById(userId).select('+password');
            }

            if (!newPassword || newPassword.length < 6) {
                return NextResponse.json({ message: "Password must be at least 6 characters" }, { status: 400 });
            }

            if (!user) {
                return NextResponse.json({ message: "User not found" }, { status: 404 })
            }

            const isPasswordValid = await bcrypt.compare(currentPassword, user.password)
            if (!isPasswordValid) {
                return NextResponse.json({ message: "Current password is incorrect" }, { status: 401 })
            }

            if (newPassword !== confirmPassword) {
                return NextResponse.json({ message: "Passwords do not match" }, { status: 400 })
            }

            user.password = await bcrypt.hash(newPassword, 10)
            await user.save()
            return NextResponse.json({ message: "Password changed successfully" }, { status: 200 })
        }

        if (account === "profile") {
            const { name, email } = body

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailRegex.test(email)) {
                return NextResponse.json({ message: "Invalid email format" }, { status: 400 });
            }

            let user;
            if (isOwner) {
                user = await Business.findById(userId)
                if (!user) {
                    return NextResponse.json({ message: "Business not found" }, { status: 404 })
                }
                user.ownerName = name
                user.email = email
            } else {
                user = await User.findById(userId)

                if (!user) {
                    return NextResponse.json({ message: "User not found" }, { status: 404 })
                }

                user.name = name
                user.email = email
            }

            await user.save()
            return NextResponse.json({ message: "Profile updated successfully" }, { status: 200 })
        }

        if (account === "business" && isOwner) {
            const { businessName, industry, address, city, country, website } = body
            const business = await Business.findById(userId)
            if (!business) {
                return NextResponse.json({ message: "Business not found" }, { status: 404 })
            }
            business.businessName = businessName
            business.industry = industry
            business.address = address
            business.city = city
            business.country = country
            business.website = website
            await business.save()
            return NextResponse.json({ message: "Business updated successfully" }, { status: 200 })
        }

        return NextResponse.json({ message: "Invalid account type" }, { status: 400 })
    } catch (error) {
        console.error('Settings PATCH error:', error)
        return NextResponse.json({ message: "Internal server error" }, { status: 500 })
    }
}