import { Controller, Post, Body } from '@nestjs/common';
import { AdminService } from './admin.service';

@Controller('api')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('adminlogin')
  async login(@Body() body: { email: string; password: string }): Promise<any> {
    const { email, password } = body;

    console.log('Admin login attempt with email:', email); // Debugging log

    // Check admin credentials
    const admin = await this.adminService.findByEmail(email);

    if (!admin) {
      console.log('Admin not found'); // Debugging log
      return { success: false, message: 'Admin not found' };
    }

    console.log('Admin found:', admin); // Debugging log

    if (admin.password !== password) {
      console.log('Invalid password'); // Debugging log
      return { success: false, message: 'Invalid password' };
    }

    console.log('Admin login successful'); // Debugging log
    return { success: true, message: 'Admin login successful' };
  }
}
