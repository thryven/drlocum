
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

interface BlogPreviewProps {
  files: string[]
}

export default function BlogPreview({ files }: BlogPreviewProps) {
  const [selectedFile, setSelectedFile] = useState<string | null>(files.length > 0 ? files[0] : null)

  return (
    <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
      {/* Sidebar: List of files */}
      <div className='md:col-span-1'>
        <Card>
          <CardContent className='p-4 space-y-2'>
            {files.map((file) => (
              <Button
                key={file}
                variant={file === selectedFile ? 'secondary' : 'ghost'}
                className='w-full justify-start text-left h-auto py-2'
                onClick={() => setSelectedFile(file)}
              >
                <span className='capitalize whitespace-normal'>
                  {file.replace('.html', '').replaceAll('-', ' ')}
                </span>
              </Button>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Preview Area */}
      <div className='md:col-span-3'>
        <Card className='h-[80vh] w-full'>
          <CardContent className='p-0 h-full'>
            {selectedFile ? (
              <iframe
                src={`/blog/${selectedFile}`}
                className='w-full h-full border-0'
                title={selectedFile}
                sandbox='allow-scripts'
              />
            ) : (
              <div className='flex items-center justify-center h-full text-muted-foreground'>
                <p>Select a blog post to preview</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
