import { Controller, Post, Body } from '@nestjs/common';
import { ModeratorService } from './moderator.service';

@Controller('api')
export class ModeratorController {
  constructor(private readonly ModeratorService: ModeratorService) {}

  @Post('moderatorlogin')
  async login(@Body() body: { email: string; password: string }): Promise<any> {
    const { email, password } = body;

    console.log('Moderator login attempt with email:', email); // Debugging log

    // Check analyst credentials
    const moderator = await this.ModeratorService.findByEmail(email);

    if (!moderator) {
      console.log('Moderator not found'); // Debugging log
      return { success: false, message: 'Moderator not found' };
    }

    console.log('Moderator found:', moderator); //debugging log

    if (moderator.password !== password) {
      console.log('Invalid password'); // Debugging log
      return { success: false, message: 'Invalid password' };
    }

    console.log('Moderator login successful'); //Debugging log
    return { success: true, message: 'Moderator login successful' };
  }
}
