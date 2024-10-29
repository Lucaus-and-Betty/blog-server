import { Controller, Post, UploadedFile, UseInterceptors, Body } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import fs from 'fs';

@Controller('upload')
export class UploadController {
  constructor() {}

  // 添加文件
  @Post('')
  @UseInterceptors(FileInterceptor('file'))
  async upload(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
    if (file) {
      // 如果有双反斜杠，变成一个斜杠
      file.path = file.path.replace(/\\/g, '/');
      file.destination = file.destination.replace(/\\/g, '/');
      // 将路径 public/uploaded 换成 /static
      file.path = file.path.replace(file.destination, '/static');
      return {
        message: 'success',
        data: file
      };
    } else {
      console.log('error');
      return {
        message: 'error',
        data: null
      };
    }
  }

  // 删除文件
  @Post('delete')
  async deleteFile(@Body() body: { file_name: string }) {
    const { file_name } = body;
    // 删除文件
    fs.unlinkSync(`./public/uploaded/${file_name}`);
    return {
      message: 'success',
      data: null
    };
  }
}
