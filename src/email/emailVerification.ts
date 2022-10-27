export function emailVerificationView(token: string): string {
  const link = `${process.env.BACKEND_URL}/users/verify/${token}`;
  let temp = `
     <div style="max-width: 700px;
     margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
     <h2 style="text-align: center; text-transform: uppercase;color: teal;">Welcome to Airtime to Cash POD G.</h2>
      <p>Hi there, Follow the link by clicking on the button to verify your email
      </p>
       <a href=${link}
       style="background: crimson; text-decoration: none; color: white;
        padding: 10px 20px; margin: 10px 0;
       display: inline-block;">Click here</a>
      </div>
      `;
  return temp;
}

export function forgotPasswordVerification(id: string): string {
  const link = `${process.env.FRONTEND_URL}/forgot-password/${id}`;
  let temp = `
     <div style="max-width: 700px;
     margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
     <h3 style="text-align: center; text-transform: uppercase;color: teal;">We received a request
     to reset your password</h3>
      <p>Use the link below to set up the new password for your account. If you did not request to reset your password,
       ignore this email and the link will expire on its own
      </p>
       <a href=${link}
       style="background: crimson; text-decoration: none; color: white;
        padding: 10px 20px; margin: 10px 0;
       display: inline-block;">Click here</a>
      </div>
      `;
  return temp;
}
