import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '../schemas/user.schema';

@Controller('api')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Registration endpoint (existing)
  @Post('register')
  async register(@Body() user: User): Promise<any> {
    try {
      const newUser = await this.usersService.create(user);
      return { success: true, user: newUser };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  // New login endpoint
  @Post('login')
  async login(@Body() body: { email: string; password: string }): Promise<any> {
    const { email, password } = body;

    // Find user by email
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      return { success: false, message: 'User not found' };
    }

    // Check if the password matches (you should hash passwords for production use)
    if (user.password !== password) {
      return { success: false, message: 'Invalid password' };
    }

    // Return success if the login is valid
    return { success: true, message: 'Login successful' };
  }
}
