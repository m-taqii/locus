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

/**
 * Reset Password Email Template
 * @param {string} ownerName - Name of the user
 * @param {string} resetLink - Password reset link with token
 * @returns {string} HTML email template
 */
export function getResetPasswordEmailTemplate(ownerName, resetLink) {
    const baseUrl = process.env.APP_URL || 'http://localhost:3000';
    const logoUrl = `${baseUrl}/logo.png`;

    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Reset Your Password - Locus</title>
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
                                <img src="${logoUrl}" alt="Locus Logo" width="80" height="80" style="display: block; border-radius: 12px;" />
                            </td>
                        </tr>
                        
                        <!-- Title -->
                        <tr>
                            <td align="center" style="padding: 20px 40px;">
                                <h2 style="color: #ffffff; font-size: 28px; font-weight: 600; margin: 0;">Reset Your Password</h2>
                            </td>
                        </tr>
                        
                        <!-- Description -->
                        <tr>
                            <td align="center" style="padding: 0 40px 20px 40px;">
                                <p style="color: #9ca3af; font-size: 16px; line-height: 1.6; margin: 0;">
                                    Hi ${ownerName},<br><br>
                                    We received a request to reset your password. Click the button below to create a new password.
                                </p>
                            </td>
                        </tr>
                        
                        <!-- Reset Button -->
                        <tr>
                            <td align="center" style="padding: 20px 40px;">
                                <a href="${resetLink}" 
                                   style="display: inline-block; background: linear-gradient(135deg, #a34b27 0%, #F0A728 100%); color: #ffffff; text-decoration: none; padding: 16px 48px; border-radius: 12px; font-weight: 600; font-size: 16px;">
                                    Reset Password
                                </a>
                            </td>
                        </tr>
                        
                        <!-- Expiry Notice -->
                        <tr>
                            <td align="center" style="padding: 20px 40px;">
                                <p style="color: #6b7280; font-size: 14px; margin: 0;">
                                    This link will expire in <strong style="color: #F0A728;">1 hour</strong>
                                </p>
                            </td>
                        </tr>
                        
                        <!-- Alternative Link -->
                        <tr>
                            <td align="center" style="padding: 0 40px 20px 40px;">
                                <p style="color: #6b7280; font-size: 12px; margin: 0;">
                                    If the button doesn't work, copy and paste this link into your browser:
                                </p>
                                <p style="color: #F0A728; font-size: 12px; word-break: break-all; margin: 10px 0 0 0;">
                                    ${resetLink}
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
                                <div style="background-color: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.3); border-radius: 8px; padding: 15px;">
                                    <p style="color: #f87171; font-size: 12px; margin: 0;">
                                        ⚠️ If you didn't request a password reset, please ignore this email or contact support if you're concerned about your account security.
                                    </p>
                                </div>
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
 * User Invitation Email Template
 * @param {string} userName - Name of the invited user
 * @param {string} inviterName - Name of the person who sent the invitation
 * @param {string} businessName - Name of the business
 * @param {string} role - Role assigned to the user (Admin/Staff)
 * @param {string} inviteLink - Invitation acceptance link with token
 * @returns {string} HTML email template
 */
export function getUserInvitationEmailTemplate(userName, inviterName, businessName, role, inviteLink) {
    const baseUrl = process.env.APP_URL || 'http://localhost:3000';
    const logoUrl = `${baseUrl}/logo.png`;

    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>You're Invited to Join ${businessName} - Locus</title>
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
                                <img src="${logoUrl}" alt="Locus Logo" width="80" height="80" style="display: block; border-radius: 12px;" />
                            </td>
                        </tr>
                        
                        <!-- Title -->
                        <tr>
                            <td align="center" style="padding: 20px 40px;">
                                <h2 style="color: #ffffff; font-size: 28px; font-weight: 600; margin: 0;">You're Invited! 🎉</h2>
                            </td>
                        </tr>
                        
                        <!-- Description -->
                        <tr>
                            <td align="center" style="padding: 0 40px 20px 40px;">
                                <p style="color: #9ca3af; font-size: 16px; line-height: 1.6; margin: 0;">
                                    Hi ${userName},<br><br>
                                    <strong style="color: #F0A728;">${inviterName}</strong> has invited you to join 
                                    <strong style="color: #ffffff;">${businessName}</strong> on Locus.
                                </p>
                            </td>
                        </tr>
                        
                        <!-- Role Badge -->
                        <tr>
                            <td align="center" style="padding: 10px 40px 20px 40px;">
                                <div style="display: inline-block; background: rgba(240, 167, 40, 0.1); border: 1px solid rgba(240, 167, 40, 0.3); border-radius: 20px; padding: 8px 20px;">
                                    <span style="color: #F0A728; font-size: 14px; font-weight: 600;">Your Role: ${role}</span>
                                </div>
                            </td>
                        </tr>
                        
                        <!-- Accept Button -->
                        <tr>
                            <td align="center" style="padding: 20px 40px;">
                                <a href="${inviteLink}" 
                                   style="display: inline-block; background: linear-gradient(135deg, #a34b27 0%, #F0A728 100%); color: #ffffff; text-decoration: none; padding: 16px 48px; border-radius: 12px; font-weight: 600; font-size: 16px;">
                                    Accept Invitation
                                </a>
                            </td>
                        </tr>
                        
                        <!-- Expiry Notice -->
                        <tr>
                            <td align="center" style="padding: 10px 40px;">
                                <p style="color: #6b7280; font-size: 14px; margin: 0;">
                                    This invitation will expire in <strong style="color: #F0A728;">7 days</strong>
                                </p>
                            </td>
                        </tr>
                        
                        <!-- What You Can Do -->
                        <tr>
                            <td style="padding: 20px 40px;">
                                <p style="color: #9ca3af; font-size: 14px; margin: 0 0 15px 0;">As a team member, you'll be able to:</p>
                                <ul style="color: #9ca3af; font-size: 14px; line-height: 2; margin: 0; padding-left: 20px;">
                                    <li>📦 Manage inventory items</li>
                                    <li>📊 Track stock levels</li>
                                    <li>📝 Record stock adjustments</li>
                                    <li>📈 View business insights</li>
                                </ul>
                            </td>
                        </tr>
                        
                        <!-- Alternative Link -->
                        <tr>
                            <td align="center" style="padding: 20px 40px;">
                                <p style="color: #6b7280; font-size: 12px; margin: 0;">
                                    If the button doesn't work, copy and paste this link into your browser:
                                </p>
                                <p style="color: #F0A728; font-size: 12px; word-break: break-all; margin: 10px 0 0 0;">
                                    ${inviteLink}
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
                                    If you weren't expecting this invitation, you can safely ignore this email.
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
