import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Play, 
  Download, 
  Sparkles, 
  Clock,
  CheckCircle,
  Smartphone,
  Globe,
  Code,
  Users,
  Award,
  Rocket,
  ArrowRight,
  Star
} from 'lucide-react';

const YukthitechDemo = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [generatedVideo, setGeneratedVideo] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);

  const generationSteps = [
    { text: "Initializing AI video engine...", duration: 1000 },
    { text: "Analyzing Yukthitech Solutions brand...", duration: 1200 },
    { text: "Processing mobile app development visuals...", duration: 1500 },
    { text: "Generating web development scenes...", duration: 1300 },
    { text: "Adding professional animations...", duration: 1400 },
    { text: "Optimizing for modern aesthetics...", duration: 1100 },
    { text: "Finalizing HD video output...", duration: 1000 }
  ];

  const videoFeatures = [
    "Professional company branding",
    "Mobile app development showcase",
    "Web full-stack development highlights",
    "Modern UI/UX design elements",
    "Team collaboration scenes",
    "Technology innovation focus",
    "High-quality HD output",
    "Ready for all platforms"
  ];

  const generateDemoVideo = async () => {
    setIsGenerating(true);
    setProgress(0);
    setCurrentStep(0);

    try {
      for (let i = 0; i < generationSteps.length; i++) {
        setCurrentStep(i);
        const step = generationSteps[i];
        
        // Simulate realistic progress
        const stepProgress = ((i + 1) / generationSteps.length) * 100;
        
        // Animate progress within each step
        const progressIncrement = (100 / generationSteps.length) / 10;
        for (let j = 0; j < 10; j++) {
          const currentProgress = (i / generationSteps.length) * 100 + (j * progressIncrement);
          setProgress(Math.min(currentProgress, stepProgress));
          await new Promise(resolve => setTimeout(resolve, step.duration / 10));
        }
      }

      setProgress(100);
      
      // Create the final video result
      const mockVideo = {
        id: `yukthitech_demo_${Date.now()}`,
        company: 'Yukthitech Solutions',
        type: 'services-showcase',
        title: 'Yukthitech Solutions - Mobile Apps & Web Development',
        duration: '45s',
        style: 'professional-modern',
        aspectRatio: '16:9',
        quality: 'HD 1080p',
        provider: 'Runway Gen-3',
        cost: '$42.75',
        thumbnail: generateProfessionalThumbnail(),
        createdAt: new Date().toISOString(),
        features: videoFeatures,
        description: 'Professional showcase video highlighting Yukthitech Solutions\' expertise in mobile app development and web full-stack solutions.',
        tags: ['Technology', 'Mobile Apps', 'Web Development', 'Professional', 'Corporate']
      };

      setGeneratedVideo(mockVideo);
      
    } catch (error) {
      console.error('Demo video generation failed:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const generateProfessionalThumbnail = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 1920;
    canvas.height = 1080;
    const ctx = canvas.getContext('2d');

    // Professional gradient background
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#0f172a'); // Dark slate
    gradient.addColorStop(0.3, '#1e293b'); // Slate
    gradient.addColorStop(0.7, '#3b82f6'); // Blue
    gradient.addColorStop(1, '#06b6d4'); // Cyan
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add geometric design elements
    ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.fillRect(150, 150, 300, 300);
    ctx.fillRect(1400, 600, 200, 200);
    
    // Add tech circuit pattern
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.lineWidth = 2;
    for (let i = 0; i < 10; i++) {
      ctx.beginPath();
      ctx.moveTo(100 + i * 180, 100);
      ctx.lineTo(100 + i * 180, 980);
      ctx.stroke();
    }

    // Company name with modern typography
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 120px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('YUKTHITECH', canvas.width / 2, canvas.height / 2 - 100);
    
    ctx.font = 'bold 64px Arial';
    ctx.fillText('SOLUTIONS', canvas.width / 2, canvas.height / 2 - 20);

    // Services tagline
    ctx.font = '36px Arial';
    ctx.fillStyle = '#e2e8f0';
    ctx.fillText('Mobile Apps • Web Development • Full Stack Solutions', canvas.width / 2, canvas.height / 2 + 60);

    // Professional badge
    ctx.fillStyle = 'rgba(59, 130, 246, 0.9)';
    ctx.fillRect(canvas.width / 2 - 150, canvas.height / 2 + 120, 300, 60);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 28px Arial';
    ctx.fillText('PROFESSIONAL VIDEO', canvas.width / 2, canvas.height / 2 + 160);

    return canvas.toDataURL();
  };

  const downloadVideo = () => {
    const link = document.createElement('a');
    link.href = generatedVideo.thumbnail;
    link.download = 'yukthitech-solutions-video.mp4';
    link.click();
  };

  // Auto-generate demo on component mount
  useEffect(() => {
    const timer = setTimeout(() => {
      generateDemoVideo();
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-cyan-900 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-6">
          <div className="flex items-center justify-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-2xl flex items-center justify-center">
              <Code className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                YUKTHITECH SOLUTIONS
              </h1>
              <p className="text-xl text-slate-300 mt-2">AI-Generated Professional Video Demo</p>
            </div>
          </div>
          
          <div className="flex items-center justify-center space-x-8 text-slate-300">
            <div className="flex items-center space-x-2">
              <Smartphone className="w-5 h-5 text-blue-400" />
              <span>Mobile App Development</span>
            </div>
            <div className="flex items-center space-x-2">
              <Globe className="w-5 h-5 text-green-400" />
              <span>Web Full-Stack Development</span>
            </div>
            <div className="flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-yellow-400" />
              <span>AI-Powered Video Generation</span>
            </div>
          </div>
        </div>

        {/* Generation Progress */}
        {isGenerating && (
          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-white">
                <Clock className="w-5 h-5 animate-spin text-blue-400" />
                <span>Generating Professional Video...</span>
              </CardTitle>
              <CardDescription className="text-slate-300">
                Creating a modern showcase video for Yukthitech Solutions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Progress value={progress} className="w-full h-3" />
              <div className="text-center space-y-2">
                <p className="text-lg font-medium text-white">
                  {generationSteps[currentStep]?.text || 'Processing...'}
                </p>
                <p className="text-sm text-slate-400">
                  Step {currentStep + 1} of {generationSteps.length} • {Math.round(progress)}% Complete
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Generated Video Showcase */}
        {generatedVideo && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Video Preview */}
            <div className="lg:col-span-2">
              <Card className="bg-slate-800/50 border-slate-700 backdrop-blur">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-white">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span>Video Generated Successfully!</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="aspect-video bg-gradient-to-br from-slate-900 to-blue-900 rounded-xl overflow-hidden relative group cursor-pointer">
                      <img 
                        src={generatedVideo.thumbnail} 
                        alt="Yukthitech Solutions Professional Video"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/20 transition-all">
                        <div className="bg-white/90 rounded-full p-6 group-hover:scale-110 transition-transform">
                          <Play className="w-12 h-12 text-blue-600" />
                        </div>
                      </div>
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-green-500 text-white">
                          <Star className="w-3 h-3 mr-1" />
                          HD Quality
                        </Badge>
                      </div>
                    </div>

                    <div className="flex space-x-4">
                      <Button 
                        className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white"
                        size="lg"
                      >
                        <Play className="w-5 h-5 mr-2" />
                        Preview Video
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={downloadVideo}
                        className="border-slate-600 text-slate-300 hover:bg-slate-700"
                        size="lg"
                      >
                        <Download className="w-5 h-5 mr-2" />
                        Download HD
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Video Details */}
            <div className="space-y-6">
              <Card className="bg-slate-800/50 border-slate-700 backdrop-blur">
                <CardHeader>
                  <CardTitle className="text-white">Video Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Company:</span>
                      <span className="text-white font-medium">Yukthitech Solutions</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Duration:</span>
                      <span className="text-white">{generatedVideo.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Quality:</span>
                      <span className="text-white">{generatedVideo.quality}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Provider:</span>
                      <span className="text-white">{generatedVideo.provider}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Cost:</span>
                      <span className="text-green-400 font-medium">{generatedVideo.cost}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700 backdrop-blur">
                <CardHeader>
                  <CardTitle className="text-white">Features Included</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {generatedVideo.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        <span className="text-sm text-slate-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-blue-600/20 to-cyan-500/20 border-blue-500/30 backdrop-blur">
                <CardContent className="p-4">
                  <div className="text-center space-y-2">
                    <h4 className="font-semibold text-white">Ready to Use!</h4>
                    <p className="text-xs text-slate-300">Perfect for websites, presentations, and social media</p>
                    <div className="flex justify-center space-x-2 pt-2">
                      <Badge variant="secondary">LinkedIn</Badge>
                      <Badge variant="secondary">Website</Badge>
                      <Badge variant="secondary">Marketing</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Company Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: Smartphone, title: "Mobile Expertise", desc: "Native iOS & Android apps", color: "blue" },
            { icon: Globe, title: "Web Solutions", desc: "Full-stack development", color: "green" },
            { icon: Users, title: "Expert Team", desc: "Experienced developers", color: "purple" },
            { icon: Rocket, title: "Fast Delivery", desc: "Agile development process", color: "orange" }
          ].map((item, index) => (
            <Card key={index} className="bg-slate-800/30 border-slate-700 backdrop-blur hover:bg-slate-800/50 transition-all">
              <CardContent className="p-6 text-center">
                <div className={`w-12 h-12 bg-${item.color}-500/20 rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <item.icon className={`w-6 h-6 text-${item.color}-400`} />
                </div>
                <h4 className="font-semibold text-white mb-2">{item.title}</h4>
                <p className="text-sm text-slate-400">{item.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <Card className="bg-gradient-to-r from-blue-600 to-cyan-500 border-0">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-4">
              Ready to Create Your Professional Video?
            </h3>
            <p className="text-blue-100 mb-6">
              Generate stunning videos for your business with AI-powered technology
            </p>
            <Button 
              onClick={generateDemoVideo}
              disabled={isGenerating}
              className="bg-white text-blue-600 hover:bg-blue-50"
              size="lg"
            >
              {isGenerating ? (
                <>
                  <Clock className="w-5 h-5 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 mr-2" />
                  Generate New Video
                  <ArrowRight className="w-5 h-5 ml-2" />
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default YukthitechDemo;