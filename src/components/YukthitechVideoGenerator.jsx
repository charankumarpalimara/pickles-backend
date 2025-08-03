import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Play, 
  Download, 
  Wand2, 
  Video, 
  Settings, 
  Clock,
  Sparkles,
  Smartphone,
  Globe,
  Code,
  Zap,
  Users,
  Award,
  Rocket,
  Monitor
} from 'lucide-react';

const YukthitechVideoGenerator = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [generatedVideo, setGeneratedVideo] = useState(null);
  const [selectedVideoType, setSelectedVideoType] = useState('company-intro');
  const canvasRef = useRef(null);

  // Yukthitech-specific video configurations
  const videoTypes = [
    {
      id: 'company-intro',
      name: 'Company Introduction',
      description: 'Professional company overview showcasing expertise',
      duration: '30s',
      style: 'corporate-modern'
    },
    {
      id: 'services-showcase',
      name: 'Services Showcase',
      description: 'Highlight mobile app and web development services',
      duration: '45s',
      style: 'tech-focused'
    },
    {
      id: 'portfolio-demo',
      name: 'Portfolio Demo',
      description: 'Showcase previous projects and capabilities',
      duration: '60s',
      style: 'project-focused'
    },
    {
      id: 'social-media',
      name: 'Social Media Promo',
      description: 'Quick engaging video for social platforms',
      duration: '15s',
      style: 'dynamic-modern'
    }
  ];

  const aiPrompts = {
    'company-intro': `Create a professional, modern video for Yukthitech Solutions, a leading technology company. Show sleek office environments with developers working on computers, mobile devices displaying modern apps, and web interfaces on large monitors. Include futuristic tech elements, clean geometric animations, and a professional blue and white color scheme. The video should convey innovation, expertise, and reliability in software development.`,
    
    'services-showcase': `Generate a dynamic video showcasing Yukthitech Solutions' core services: mobile app development and web full-stack development. Show smooth transitions between mobile phone screens displaying beautiful apps, desktop computers with modern web applications, coding environments, and developers collaborating. Include tech icons, circuit board patterns, and modern UI elements. Style should be sleek, professional, and technology-focused with smooth animations.`,
    
    'portfolio-demo': `Create an impressive portfolio showcase video for Yukthitech Solutions. Display various mobile applications on different devices (iPhone, Android), responsive web applications on laptops and desktops, e-commerce platforms, and business applications. Show the development process with code editors, design tools, and team collaboration. Include client testimonials text overlays and project statistics. Modern, professional style with smooth transitions.`,
    
    'social-media': `Generate a fast-paced, engaging social media video for Yukthitech Solutions. Quick cuts showing mobile apps launching, web pages loading, developers high-fiving, modern office space, and tech devices. Include trendy transitions, bold text overlays with "Mobile Apps", "Web Development", "Full Stack Solutions", and company branding. Energetic, modern style perfect for Instagram, LinkedIn, and Facebook.`
  };

  const generateYukthitechVideo = async () => {
    setIsGenerating(true);
    setProgress(0);

    try {
      // Simulate AI video generation with realistic progress
      const steps = [
        { progress: 10, message: 'Analyzing Yukthitech brand requirements...' },
        { progress: 25, message: 'Processing AI prompt for tech company video...' },
        { progress: 40, message: 'Generating modern tech visuals...' },
        { progress: 55, message: 'Adding mobile app and web development scenes...' },
        { progress: 70, message: 'Applying professional animations...' },
        { progress: 85, message: 'Optimizing for modern aesthetics...' },
        { progress: 100, message: 'Finalizing Yukthitech Solutions video...' }
      ];

      for (const step of steps) {
        setProgress(step.progress);
        await new Promise(resolve => setTimeout(resolve, 800));
      }

      // Create mock video result
      const mockVideo = {
        id: Date.now(),
        type: selectedVideoType,
        company: 'Yukthitech Solutions',
        prompt: aiPrompts[selectedVideoType],
        duration: videoTypes.find(v => v.id === selectedVideoType)?.duration,
        style: videoTypes.find(v => v.id === selectedVideoType)?.style,
        url: 'https://example.com/yukthitech-video.mp4',
        thumbnail: generateThumbnail(),
        createdAt: new Date().toISOString(),
        features: [
          'Mobile App Development',
          'Web Full-Stack Development',
          'Modern UI/UX Design',
          'Professional Branding'
        ]
      };

      setGeneratedVideo(mockVideo);
      
    } catch (error) {
      console.error('Video generation failed:', error);
    } finally {
      setIsGenerating(false);
      setProgress(0);
    }
  };

  const generateThumbnail = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 1280;
    canvas.height = 720;
    const ctx = canvas.getContext('2d');

    // Create gradient background
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#1e3a8a'); // Deep blue
    gradient.addColorStop(0.5, '#3b82f6'); // Blue
    gradient.addColorStop(1, '#06b6d4'); // Cyan
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add geometric shapes
    ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.fillRect(100, 100, 200, 200);
    ctx.fillRect(900, 400, 150, 150);

    // Add company name
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 72px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('YUKTHITECH', canvas.width / 2, canvas.height / 2 - 50);
    
    ctx.font = '36px Arial';
    ctx.fillText('SOLUTIONS', canvas.width / 2, canvas.height / 2 + 20);

    // Add tagline
    ctx.font = '24px Arial';
    ctx.fillStyle = '#e2e8f0';
    ctx.fillText('Mobile Apps • Web Development • Full Stack Solutions', canvas.width / 2, canvas.height / 2 + 80);

    return canvas.toDataURL();
  };

  const downloadVideo = () => {
    // In a real implementation, this would trigger the actual video download
    const link = document.createElement('a');
    link.href = generatedVideo.thumbnail; // This would be the actual video URL
    link.download = `yukthitech-${selectedVideoType}-video.mp4`;
    link.click();
  };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-lg flex items-center justify-center">
            <Code className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              YUKTHITECH SOLUTIONS
            </h1>
            <p className="text-gray-600">Professional Video Generator</p>
          </div>
        </div>
        
        <div className="flex items-center justify-center space-x-6 text-sm text-gray-600">
          <div className="flex items-center space-x-2">
            <Smartphone className="w-4 h-4" />
            <span>Mobile App Development</span>
          </div>
          <div className="flex items-center space-x-2">
            <Globe className="w-4 h-4" />
            <span>Web Full-Stack Development</span>
          </div>
          <div className="flex items-center space-x-2">
            <Zap className="w-4 h-4" />
            <span>Modern Solutions</span>
          </div>
        </div>
      </div>

      <Card className="border-2 border-blue-100">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50">
          <CardTitle className="flex items-center space-x-2">
            <Wand2 className="w-5 h-5 text-blue-600" />
            <span>AI Video Generation for Yukthitech</span>
          </CardTitle>
          <CardDescription>
            Create professional videos showcasing mobile app and web development expertise
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium mb-3">Select Video Type</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {videoTypes.map(type => (
                <div
                  key={type.id}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedVideoType === type.id 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                  onClick={() => setSelectedVideoType(type.id)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold text-gray-800">{type.name}</h4>
                    <Badge variant="outline" className="text-xs">
                      {type.duration}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{type.description}</p>
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary" className="text-xs">
                      {type.style}
                    </Badge>
                    {type.id === 'company-intro' && <Monitor className="w-4 h-4 text-blue-500" />}
                    {type.id === 'services-showcase' && <Code className="w-4 h-4 text-green-500" />}
                    {type.id === 'portfolio-demo' && <Award className="w-4 h-4 text-purple-500" />}
                    {type.id === 'social-media' && <Rocket className="w-4 h-4 text-orange-500" />}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {selectedVideoType && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium mb-2">AI Prompt Preview:</h4>
              <p className="text-sm text-gray-700 leading-relaxed">
                {aiPrompts[selectedVideoType]}
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <Smartphone className="w-8 h-8 mx-auto text-blue-500 mb-2" />
                <h4 className="font-medium">Mobile Apps</h4>
                <p className="text-xs text-gray-600">iOS & Android Development</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Globe className="w-8 h-8 mx-auto text-green-500 mb-2" />
                <h4 className="font-medium">Web Development</h4>
                <p className="text-xs text-gray-600">Full-Stack Solutions</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Users className="w-8 h-8 mx-auto text-purple-500 mb-2" />
                <h4 className="font-medium">Expert Team</h4>
                <p className="text-xs text-gray-600">Professional Developers</p>
              </CardContent>
            </Card>
          </div>

          <Button 
            onClick={generateYukthitechVideo} 
            disabled={isGenerating}
            className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white py-3"
            size="lg"
          >
            {isGenerating ? (
              <>
                <Clock className="w-5 h-5 mr-2 animate-spin" />
                Generating Professional Video...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 mr-2" />
                Generate Yukthitech Video
              </>
            )}
          </Button>

          {isGenerating && (
            <div className="space-y-3">
              <Progress value={progress} className="w-full h-2" />
              <p className="text-sm text-gray-600 text-center">
                {progress < 25 ? 'Analyzing Yukthitech brand requirements...' :
                 progress < 50 ? 'Generating modern tech visuals...' :
                 progress < 75 ? 'Adding mobile and web development scenes...' : 
                 'Finalizing professional video...'}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {generatedVideo && (
        <Card className="border-2 border-green-100">
          <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50">
            <CardTitle className="flex items-center space-x-2">
              <Play className="w-5 h-5 text-green-600" />
              <span>Generated Video - {generatedVideo.company}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <div className="aspect-video bg-gradient-to-br from-blue-900 to-cyan-600 rounded-lg flex items-center justify-center mb-4 relative overflow-hidden">
                  <img 
                    src={generatedVideo.thumbnail} 
                    alt="Yukthitech Solutions Video"
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                    <div className="bg-white bg-opacity-90 rounded-full p-4">
                      <Play className="w-12 h-12 text-blue-600" />
                    </div>
                  </div>
                </div>
                <div className="flex space-x-3">
                  <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                    <Play className="w-4 h-4 mr-2" />
                    Preview Video
                  </Button>
                  <Button variant="outline" onClick={downloadVideo}>
                    <Download className="w-4 h-4 mr-2" />
                    Download HD
                  </Button>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-3 text-blue-800">Video Details</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Company:</span>
                      <span className="font-medium">Yukthitech Solutions</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Type:</span>
                      <span className="capitalize">{generatedVideo.type.replace('-', ' ')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Duration:</span>
                      <span>{generatedVideo.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Style:</span>
                      <span className="capitalize">{generatedVideo.style.replace('-', ' ')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Created:</span>
                      <span>{new Date(generatedVideo.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3 text-blue-800">Features Highlighted</h4>
                  <div className="space-y-2">
                    {generatedVideo.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="text-sm text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-blue-50 p-3 rounded-lg">
                  <h4 className="font-semibold mb-2 text-blue-800">Ready for:</h4>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">Website</Badge>
                    <Badge variant="secondary">LinkedIn</Badge>
                    <Badge variant="secondary">Presentations</Badge>
                    <Badge variant="secondary">Marketing</Badge>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Settings className="w-5 h-5" />
            <span>Why Choose Yukthitech Solutions?</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center p-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Smartphone className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="font-medium mb-2">Mobile Expertise</h4>
              <p className="text-sm text-gray-600">Native iOS & Android development with modern frameworks</p>
            </div>
            <div className="text-center p-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Globe className="w-6 h-6 text-green-600" />
              </div>
              <h4 className="font-medium mb-2">Web Solutions</h4>
              <p className="text-sm text-gray-600">Full-stack web development with latest technologies</p>
            </div>
            <div className="text-center p-4">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <h4 className="font-medium mb-2">Expert Team</h4>
              <p className="text-sm text-gray-600">Experienced developers and designers</p>
            </div>
            <div className="text-center p-4">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Rocket className="w-6 h-6 text-orange-600" />
              </div>
              <h4 className="font-medium mb-2">Fast Delivery</h4>
              <p className="text-sm text-gray-600">Agile development with quick turnaround</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default YukthitechVideoGenerator;