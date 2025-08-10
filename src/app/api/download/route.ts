import { NextRequest, NextResponse } from 'next/server';
import { execSync } from 'child_process';
import { unlinkSync, existsSync, readFileSync } from 'fs';
import { join } from 'path';

export async function GET(request: NextRequest) {
  try {
    const projectPath = process.cwd();
    const downloadPath = join(projectPath, 'public');
    const tarFileName = 'augmex-dashboard-complete.tar.gz';
    const tarFilePath = join(downloadPath, tarFileName);

    // Remove existing file if it exists
    if (existsSync(tarFilePath)) {
      unlinkSync(tarFilePath);
    }

    // Create a simple tar.gz file with basic exclusions
    const tarCommand = `tar -czf ${tarFilePath} --exclude=node_modules --exclude=.git --exclude=.next --exclude=*.log -C ${projectPath} .`;
    
    try {
      execSync(tarCommand, { stdio: 'pipe', timeout: 30000 }); // 30 second timeout
    } catch (execError) {
      console.error('Tar command failed:', execError);
      throw new Error('Failed to create archive');
    }

    // Read the created file
    const fileBuffer = readFileSync(tarFilePath);
    
    // Clean up the temporary file
    unlinkSync(tarFilePath);

    // Return the file as a download
    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': 'application/gzip',
        'Content-Disposition': `attachment; filename="${tarFileName}"`,
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    });

  } catch (error) {
    console.error('Download generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate download file' },
      { status: 500 }
    );
  }
}