import { Controller, Post, Body } from '@nestjs/common';
import { AnalystService } from './analyst.service';

@Controller('api')
export class AnalystController {
  constructor(private readonly analystService: AnalystService) {}

  @Post('analystlogin')
  async login(@Body() body: { email: string; password: string }): Promise<any> {
    const { email, password } = body;

    console.log('Analyst login attempt with email:', email); // Debugging log

    // Check analyst credentials
    const analyst = await this.analystService.findByEmail(email);

    if (!analyst) {
      console.log('Analyst not found'); // Debugging log
      return { success: false, message: 'Analyst not found' };
    }

    console.log('Analyst found:', analyst); //debugging log

    if (analyst.password !== password) {
      console.log('Invalid password'); // Debugging log
      return { success: false, message: 'Invalid password' };
    }

    console.log('Admin login successful'); //Debugging log
    return { success: true, message: 'Analyst login successful' };
  }
}
