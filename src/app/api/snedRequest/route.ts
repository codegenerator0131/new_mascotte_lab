import { NextRequest, NextResponse } from "next/server";
import transporter from "@/lib/emailTransporter";
import { getSignedS3Url } from "@/lib/s3Client";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { subject, name, company, email, telephone, size, color, request } =
      body;

    const companyName = process.env.COMPANY_NAME || "Mascotte.AI";
    const logoName = process.env.LOGO_NAME;

    let signedUrl = "";
    if (logoName) {
      try {
        signedUrl = await getSignedS3Url(logoName);
      } catch (error) {
        console.error("Error getting signed URL:", error);
      }
    }

    // Prepare email content based on request type
    let emailContent = "";

    if (subject === "Holobox Request") {
      // Hardware/Holobox request
      emailContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${subject}</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                <main>
                    ${
                      signedUrl
                        ? `<div style="text-align: center; margin-bottom: 20px;">
                        <img src="${signedUrl}" alt="Logo" style="max-width: 100px;">
                    </div>`
                        : ""
                    }
                    <h2 style="text-align: center; color: #1e293b;">${subject}</h2>
                    <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
                        <h3 style="margin-top: 0; color: #475569;">Contact Information</h3>
                        <p><strong>Name:</strong> ${name}</p>
                        <p><strong>Company:</strong> ${company}</p>
                        <p><strong>Email:</strong> ${email}</p>
                        <p><strong>Telephone:</strong> ${telephone}</p>
                    </div>
                    <div style="background-color: #f1f5f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
                        <h3 style="margin-top: 0; color: #475569;">Product Configuration</h3>
                        <p><strong>Size:</strong> ${size}</p>
                        <p><strong>Color:</strong> ${color}</p>
                    </div>
                    ${
                      request
                        ? `<div style="background-color: #fff; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px; margin: 20px 0;">
                        <h3 style="margin-top: 0; color: #475569;">Additional Requirements</h3>
                        <p style="white-space: pre-wrap;">${request}</p>
                    </div>`
                        : ""
                    }
                    <p style="color: #64748b; font-size: 14px; margin-top: 30px;">
                        This request was submitted via the ${companyName} website.
                    </p>
                </main>
                <footer style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0; font-size: 0.9em; color: #64748b;">
                    <p>© ${new Date().getFullYear()} ${companyName}. All rights reserved.</p>
                </footer>
            </div>
        </body>
        </html>
      `;
    } else if (subject === "Workshop Booking Request") {
      // Workshop booking request
      emailContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${subject}</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                <main>
                    ${
                      signedUrl
                        ? `<div style="text-align: center; margin-bottom: 20px;">
                        <img src="${signedUrl}" alt="Logo" style="max-width: 100px;">
                    </div>`
                        : ""
                    }
                    <h2 style="text-align: center; color: #1e293b;">${subject}</h2>
                    <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
                        <h3 style="margin-top: 0; color: #475569;">Contact Information</h3>
                        <p><strong>Company:</strong> ${company}</p>
                        <p><strong>Email:</strong> ${email}</p>
                    </div>
                    <p style="color: #64748b; font-size: 14px; margin-top: 30px;">
                        This workshop booking request was submitted via the ${companyName} website.
                    </p>
                </main>
                <footer style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0; font-size: 0.9em; color: #64748b;">
                    <p>© ${new Date().getFullYear()} ${companyName}. All rights reserved.</p>
                </footer>
            </div>
        </body>
        </html>
      `;
    } else {
      return NextResponse.json(
        { error: "Invalid request subject" },
        { status: 400 }
      );
    }

    // Send email to mao@reblika.com
    await transporter.sendMail({
      from: `${companyName} <noreply@mascotte.com>`,
      to: "mao@reblika.com",
      subject: subject,
      html: emailContent,
    });

    return NextResponse.json({
      success: true,
      message:
        "Request sent successfully. We'll get back to you within 24 hours.",
    });
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { error: "Error processing the request" },
      { status: 500 }
    );
  }
}
