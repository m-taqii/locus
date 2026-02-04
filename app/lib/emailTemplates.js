// Email Templates for Locus
// These templates follow the Locus brand theme (dark with orange gradient)

/**
 * OTP Verification Email Template
 * @param {string} ownerName - Name of the business owner
 * @param {string} otpCode - 6-digit verification code
 * @returns {string} HTML email template
 */
export function getOTPEmailTemplate(ownerName, otpCode) {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Verify Your Email - Locus</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #1a1a1e;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #1a1a1e; padding: 40px 20px;">
            <tr>
                <td align="center">
                    <!-- Main Container -->
                    <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 500px; background-color: #242529; border-radius: 16px; border: 1px solid rgba(255,255,255,0.1);">
                        
                        <!-- Logo Section -->
                        <tr>
                            <td align="center" style="padding: 40px 40px 20px 40px;">
                                <!-- Text-based logo that works in all email clients -->
                                <table cellpadding="0" cellspacing="0" style="margin: 0 auto;">
                                    <tr>
                                        <td style="width: 60px; height: 60px; background: linear-gradient(135deg, #a34b27 0%, #F0A728 100%); border-radius: 12px; text-align: center; vertical-align: middle;">
                                            <span style="color: #ffffff; font-size: 28px; font-weight: bold;">LOCUS</span>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        
                        <!-- Title -->
                        <tr>
                            <td align="center" style="padding: 20px 40px;">
                                <h2 style="color: #ffffff; font-size: 28px; font-weight: 600; margin: 0;">Verify Your Email</h2>
                            </td>
                        </tr>
                        
                        <!-- Description -->
                        <tr>
                            <td align="center" style="padding: 0 40px 20px 40px;">
                                <p style="color: #9ca3af; font-size: 16px; line-height: 1.6; margin: 0;">
                                    Hi ${ownerName},<br><br>
                                    Thank you for signing up for Locus! Please use the verification code below to confirm your email address.
                                </p>
                            </td>
                        </tr>
                        
                        <!-- OTP Code Box -->
                        <tr>
                            <td align="center" style="padding: 20px 40px;">
                                <div style="background: linear-gradient(135deg, #a34b27 0%, #F0A728 100%); border-radius: 12px; padding: 20px 40px; display: inline-block;">
                                    <span style="color: #ffffff; font-size: 32px; font-weight: bold; letter-spacing: 8px;">${otpCode}</span>
                                </div>
                            </td>
                        </tr>
                        
                        <!-- Expiry Notice -->
                        <tr>
                            <td align="center" style="padding: 20px 40px;">
                                <p style="color: #6b7280; font-size: 14px; margin: 0;">
                                    This code will expire in <strong style="color: #F0A728;">10 minutes</strong>
                                </p>
                            </td>
                        </tr>
                        
                        <!-- Divider -->
                        <tr>
                            <td style="padding: 20px 40px;">
                                <div style="border-top: 1px solid rgba(255,255,255,0.1);"></div>
                            </td>
                        </tr>
                        
                        <!-- Security Notice -->
                        <tr>
                            <td align="center" style="padding: 0 40px 20px 40px;">
                                <p style="color: #6b7280; font-size: 12px; margin: 0;">
                                    If you didn't request this code, you can safely ignore this email.
                                </p>
                            </td>
                        </tr>
                        
                        <!-- Footer -->
                        <tr>
                            <td align="center" style="padding: 20px 40px 40px 40px;">
                                <p style="color: #6b7280; font-size: 12px; margin: 0;">
                                    © ${new Date().getFullYear()} Locus. All rights reserved.
                                </p>
                                <p style="color: #4b5563; font-size: 11px; margin: 10px 0 0 0;">
                                    Inventory Management Made Simple
                                </p>
                            </td>
                        </tr>
                        
                    </table>
                </td>
            </tr>
        </table>
    </body>
    </html>
    `;
}

/**
 * Welcome Email Template (after successful verification)
 * @param {string} ownerName - Name of the business owner
 * @param {string} businessName - Name of the business
 * @returns {string} HTML email template
 */
export function getWelcomeEmailTemplate(ownerName, businessName) {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to Locus</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #1a1a1e;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #1a1a1e; padding: 40px 20px;">
            <tr>
                <td align="center">
                    <!-- Main Container -->
                    <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 500px; background-color: #242529; border-radius: 16px; border: 1px solid rgba(255,255,255,0.1);">
                        
                        <!-- Logo Section -->
                        <tr>
                            <td align="center" style="padding: 40px 40px 20px 40px;">
                                <div style="width: 60px; height: 60px; background: linear-gradient(135deg, #a34b27 0%, #F0A728 100%); border-radius: 12px;"></div>
                                <h1 style="color: #F0A728; font-size: 24px; font-weight: bold; margin: 20px 0 0 0; letter-spacing: 2px;">LOCUS</h1>
                            </td>
                        </tr>
                        
                        <!-- Title -->
                        <tr>
                            <td align="center" style="padding: 20px 40px;">
                                <h2 style="color: #ffffff; font-size: 28px; font-weight: 600; margin: 0;">Welcome to Locus! 🎉</h2>
                            </td>
                        </tr>
                        
                        <!-- Description -->
                        <tr>
                            <td align="center" style="padding: 0 40px 30px 40px;">
                                <p style="color: #9ca3af; font-size: 16px; line-height: 1.6; margin: 0;">
                                    Hi ${ownerName},<br><br>
                                    Your account for <strong style="color: #F0A728;">${businessName}</strong> has been successfully verified! You're all set to start managing your inventory.
                                </p>
                            </td>
                        </tr>
                        
                        <!-- CTA Button -->
                        <tr>
                            <td align="center" style="padding: 0 40px 30px 40px;">
                                <a href="${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/dashboard" 
                                   style="display: inline-block; background: linear-gradient(135deg, #a34b27 0%, #F0A728 100%); color: #ffffff; text-decoration: none; padding: 14px 40px; border-radius: 12px; font-weight: 600; font-size: 16px;">
                                    Go to Dashboard
                                </a>
                            </td>
                        </tr>
                        
                        <!-- Features List -->
                        <tr>
                            <td style="padding: 0 40px 30px 40px;">
                                <p style="color: #9ca3af; font-size: 14px; margin: 0 0 15px 0;">Here's what you can do:</p>
                                <ul style="color: #9ca3af; font-size: 14px; line-height: 2; margin: 0; padding-left: 20px;">
                                    <li>📦 Manage your inventory</li>
                                    <li>👥 Add team members</li>
                                    <li>📊 Track stock levels</li>
                                    <li>📈 View sales analytics</li>
                                </ul>
                            </td>
                        </tr>
                        
                        <!-- Divider -->
                        <tr>
                            <td style="padding: 0 40px 20px 40px;">
                                <div style="border-top: 1px solid rgba(255,255,255,0.1);"></div>
                            </td>
                        </tr>
                        
                        <!-- Footer -->
                        <tr>
                            <td align="center" style="padding: 0 40px 40px 40px;">
                                <p style="color: #6b7280; font-size: 12px; margin: 0;">
                                    © ${new Date().getFullYear()} Locus. All rights reserved.
                                </p>
                                <p style="color: #4b5563; font-size: 11px; margin: 10px 0 0 0;">
                                    Inventory Management Made Simple
                                </p>
                            </td>
                        </tr>
                        
                    </table>
                </td>
            </tr>
        </table>
    </body>
    </html>
    `;
}
