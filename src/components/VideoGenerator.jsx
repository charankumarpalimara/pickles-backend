import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Play, 
  Download, 
  Upload, 
  Wand2, 
  Video, 
  Image, 
  Settings, 
  Clock,
  Sparkles,
  FileVideo,
  Palette,
  Music
} from 'lucide-react';

const VideoGenerator = () => {
  const [activeTab, setActiveTab] = useState('ai-generation');
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [generatedVideo, setGeneratedVideo] = useState(null);
  const [videoHistory, setVideoHistory] = useState([]);
  const canvasRef = useRef(null);

  // AI Video Generation State
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiProvider, setAiProvider] = useState('runway');
  const [videoDuration, setVideoDuration] = useState(5);
  const [videoStyle, setVideoStyle] = useState('realistic');
  const [aspectRatio, setAspectRatio] = useState('16:9');

  // Template-based Generation State
  const [selectedTemplate, setSelectedTemplate] = useState('product-showcase');
  const [templateData, setTemplateData] = useState({
    title: '',
    subtitle: '',
    images: [],
    music: null,
    colors: {
      primary: '#4A5D23',
      secondary: '#D4A574',
      accent: '#8B2635'
    }
  });

  // Programmatic Video State
  const [scenes, setScenes] = useState([
    { type: 'text', content: 'Welcome to Pickles Admin', duration: 2 },
    { type: 'chart', data: 'sales-overview', duration: 3 },
    { type: 'text', content: 'Thank you for watching', duration: 2 }
  ]);

  const videoProviders = [
    { 
      id: 'runway', 
      name: 'Runway Gen-3', 
      description: 'High-quality cinematic videos',
      pricing: '$0.95/sec',
      features: ['Text-to-video', 'Image-to-video', 'Camera controls']
    },
    { 
      id: 'pika', 
      name: 'Pika Labs', 
      description: 'Creative and artistic videos',
      pricing: '$0.50/sec',
      features: ['Text-to-video', 'Style transfer', 'Animation']
    },
    { 
      id: 'kling', 
      name: 'Kling AI', 
      description: 'Realistic motion and physics',
      pricing: '$0.30/sec',
      features: ['Text-to-video', 'Long duration', 'Motion control']
    },
    { 
      id: 'luma', 
      name: 'Luma Dream Machine', 
      description: 'Fast generation with good quality',
      pricing: '$0.25/sec',
      features: ['Text-to-video', 'Quick generation', 'Batch processing']
    }
  ];

  const videoTemplates = [
    {
      id: 'product-showcase',
      name: 'Product Showcase',
      description: 'Highlight your pickle products with elegant transitions',
      duration: '15-30s',
      elements: ['Product images', 'Text overlays', 'Background music', 'Call-to-action']
    },
    {
      id: 'sales-report',
      name: 'Sales Report',
      description: 'Animated charts and graphs for business presentations',
      duration: '30-60s',
      elements: ['Data visualization', 'Charts', 'Statistics', 'Professional styling']
    },
    {
      id: 'social-media',
      name: 'Social Media',
      description: 'Quick engaging videos for social platforms',
      duration: '15s',
      elements: ['Square format', 'Bold text', 'Trending effects', 'Brand colors']
    },
    {
      id: 'tutorial',
      name: 'Tutorial/Demo',
      description: 'Step-by-step guides and how-to videos',
      duration: '60-120s',
      elements: ['Screen recordings', 'Annotations', 'Voice-over ready', 'Clear steps']
    }
  ];

  const generateAIVideo = async () => {
    setIsGenerating(true);
    setProgress(0);

    try {
      // Simulate AI video generation process
      for (let i = 0; i <= 100; i += 10) {
        setProgress(i);
        await new Promise(resolve => setTimeout(resolve, 500));
      }

      // Mock API call to video generation service
      const mockVideo = {
        id: Date.now(),
        type: 'ai-generated',
        provider: aiProvider,
        prompt: aiPrompt,
        duration: videoDuration,
        style: videoStyle,
        aspectRatio,
        url: 'https://example.com/generated-video.mp4', // This would be the actual video URL
        thumbnail: 'https://via.placeholder.com/320x180/4A5D23/ffffff?text=Generated+Video',
        createdAt: new Date().toISOString()
      };

      setGeneratedVideo(mockVideo);
      setVideoHistory(prev => [mockVideo, ...prev]);
      
    } catch (error) {
      console.error('Video generation failed:', error);
    } finally {
      setIsGenerating(false);
      setProgress(0);
    }
  };

  const generateTemplateVideo = async () => {
    setIsGenerating(true);
    setProgress(0);

    try {
      // Simulate template video generation
      for (let i = 0; i <= 100; i += 20) {
        setProgress(i);
        await new Promise(resolve => setTimeout(resolve, 300));
      }

      const mockVideo = {
        id: Date.now(),
        type: 'template-based',
        template: selectedTemplate,
        data: templateData,
        url: 'https://example.com/template-video.mp4',
        thumbnail: 'https://via.placeholder.com/320x180/D4A574/ffffff?text=Template+Video',
        createdAt: new Date().toISOString()
      };

      setGeneratedVideo(mockVideo);
      setVideoHistory(prev => [mockVideo, ...prev]);
      
    } catch (error) {
      console.error('Template video generation failed:', error);
    } finally {
      setIsGenerating(false);
      setProgress(0);
    }
  };

  const generateProgrammaticVideo = async () => {
    setIsGenerating(true);
    setProgress(0);

    try {
      // Create programmatic video using canvas and animations
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      
      // Set canvas size
      canvas.width = 1920;
      canvas.height = 1080;

      // Simulate programmatic video creation
      for (let i = 0; i <= 100; i += 25) {
        setProgress(i);
        
        // Draw frame based on current scene
        ctx.fillStyle = templateData.colors.primary;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#ffffff';
        ctx.font = '48px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(`Frame ${i}`, canvas.width / 2, canvas.height / 2);
        
        await new Promise(resolve => setTimeout(resolve, 200));
      }

      const mockVideo = {
        id: Date.now(),
        type: 'programmatic',
        scenes: scenes,
        url: canvas.toDataURL(),
        thumbnail: canvas.toDataURL(),
        createdAt: new Date().toISOString()
      };

      setGeneratedVideo(mockVideo);
      setVideoHistory(prev => [mockVideo, ...prev]);
      
    } catch (error) {
      console.error('Programmatic video generation failed:', error);
    } finally {
      setIsGenerating(false);
      setProgress(0);
    }
  };

  const addScene = () => {
    setScenes(prev => [...prev, { type: 'text', content: '', duration: 2 }]);
  };

  const updateScene = (index, field, value) => {
    setScenes(prev => prev.map((scene, i) => 
      i === index ? { ...scene, [field]: value } : scene
    ));
  };

  const removeScene = (index) => {
    setScenes(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Video Generator</h1>
          <p className="text-gray-600 mt-2">Create professional videos for your pickle business</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="bg-green-50 text-green-700">
            <Sparkles className="w-4 h-4 mr-1" />
            AI Powered
          </Badge>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="ai-generation" className="flex items-center space-x-2">
            <Wand2 className="w-4 h-4" />
            <span>AI Generation</span>
          </TabsTrigger>
          <TabsTrigger value="templates" className="flex items-center space-x-2">
            <Video className="w-4 h-4" />
            <span>Templates</span>
          </TabsTrigger>
          <TabsTrigger value="programmatic" className="flex items-center space-x-2">
            <Settings className="w-4 h-4" />
            <span>Programmatic</span>
          </TabsTrigger>
        </TabsList>

        {/* AI Video Generation Tab */}
        <TabsContent value="ai-generation" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Wand2 className="w-5 h-5" />
                    <span>AI Video Generation</span>
                  </CardTitle>
                  <CardDescription>
                    Generate videos using state-of-the-art AI models
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Video Prompt</label>
                    <Textarea
                      placeholder="Describe the video you want to create... (e.g., 'A jar of spicy pickles rotating on a wooden table with warm lighting')"
                      value={aiPrompt}
                      onChange={(e) => setAiPrompt(e.target.value)}
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">AI Provider</label>
                      <Select value={aiProvider} onValueChange={setAiProvider}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {videoProviders.map(provider => (
                            <SelectItem key={provider.id} value={provider.id}>
                              {provider.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Duration (seconds)</label>
                      <Input
                        type="number"
                        min="1"
                        max="30"
                        value={videoDuration}
                        onChange={(e) => setVideoDuration(parseInt(e.target.value))}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Video Style</label>
                      <Select value={videoStyle} onValueChange={setVideoStyle}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="realistic">Realistic</SelectItem>
                          <SelectItem value="cinematic">Cinematic</SelectItem>
                          <SelectItem value="animated">Animated</SelectItem>
                          <SelectItem value="artistic">Artistic</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Aspect Ratio</label>
                      <Select value={aspectRatio} onValueChange={setAspectRatio}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="16:9">16:9 (Landscape)</SelectItem>
                          <SelectItem value="9:16">9:16 (Portrait)</SelectItem>
                          <SelectItem value="1:1">1:1 (Square)</SelectItem>
                          <SelectItem value="4:3">4:3 (Standard)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Button 
                    onClick={generateAIVideo} 
                    disabled={!aiPrompt || isGenerating}
                    className="w-full"
                  >
                    {isGenerating ? (
                      <>
                        <Clock className="w-4 h-4 mr-2 animate-spin" />
                        Generating Video...
                      </>
                    ) : (
                      <>
                        <Wand2 className="w-4 h-4 mr-2" />
                        Generate Video
                      </>
                    )}
                  </Button>

                  {isGenerating && (
                    <div className="space-y-2">
                      <Progress value={progress} className="w-full" />
                      <p className="text-sm text-gray-600 text-center">
                        {progress < 30 ? 'Processing prompt...' :
                         progress < 60 ? 'Generating frames...' :
                         progress < 90 ? 'Rendering video...' : 'Finalizing...'}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>AI Providers</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {videoProviders.map(provider => (
                    <div key={provider.id} className={`p-3 rounded-lg border ${
                      aiProvider === provider.id ? 'border-green-500 bg-green-50' : 'border-gray-200'
                    }`}>
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{provider.name}</h4>
                        <Badge variant="outline">{provider.pricing}</Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{provider.description}</p>
                      <div className="flex flex-wrap gap-1">
                        {provider.features.map(feature => (
                          <Badge key={feature} variant="secondary" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Template-based Generation Tab */}
        <TabsContent value="templates" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Video className="w-5 h-5" />
                    <span>Template-based Videos</span>
                  </CardTitle>
                  <CardDescription>
                    Create professional videos using pre-designed templates
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Select Template</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {videoTemplates.map(template => (
                        <div
                          key={template.id}
                          className={`p-4 rounded-lg border cursor-pointer transition-all ${
                            selectedTemplate === template.id 
                              ? 'border-green-500 bg-green-50' 
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                          onClick={() => setSelectedTemplate(template.id)}
                        >
                          <h4 className="font-medium mb-1">{template.name}</h4>
                          <p className="text-sm text-gray-600 mb-2">{template.description}</p>
                          <div className="flex items-center justify-between">
                            <Badge variant="outline">{template.duration}</Badge>
                            <span className="text-xs text-gray-500">
                              {template.elements.length} elements
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Video Title</label>
                      <Input
                        placeholder="Enter your video title..."
                        value={templateData.title}
                        onChange={(e) => setTemplateData(prev => ({
                          ...prev,
                          title: e.target.value
                        }))}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Subtitle</label>
                      <Input
                        placeholder="Enter subtitle (optional)..."
                        value={templateData.subtitle}
                        onChange={(e) => setTemplateData(prev => ({
                          ...prev,
                          subtitle: e.target.value
                        }))}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Brand Colors</label>
                      <div className="grid grid-cols-3 gap-3">
                        <div>
                          <label className="block text-xs text-gray-500 mb-1">Primary</label>
                          <Input
                            type="color"
                            value={templateData.colors.primary}
                            onChange={(e) => setTemplateData(prev => ({
                              ...prev,
                              colors: { ...prev.colors, primary: e.target.value }
                            }))}
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-gray-500 mb-1">Secondary</label>
                          <Input
                            type="color"
                            value={templateData.colors.secondary}
                            onChange={(e) => setTemplateData(prev => ({
                              ...prev,
                              colors: { ...prev.colors, secondary: e.target.value }
                            }))}
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-gray-500 mb-1">Accent</label>
                          <Input
                            type="color"
                            value={templateData.colors.accent}
                            onChange={(e) => setTemplateData(prev => ({
                              ...prev,
                              colors: { ...prev.colors, accent: e.target.value }
                            }))}
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Upload Images</label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                        <p className="text-sm text-gray-600">
                          Drop images here or click to browse
                        </p>
                        <Input type="file" multiple accept="image/*" className="hidden" />
                      </div>
                    </div>
                  </div>

                  <Button 
                    onClick={generateTemplateVideo} 
                    disabled={!templateData.title || isGenerating}
                    className="w-full"
                  >
                    {isGenerating ? (
                      <>
                        <Clock className="w-4 h-4 mr-2 animate-spin" />
                        Creating Video...
                      </>
                    ) : (
                      <>
                        <Video className="w-4 h-4 mr-2" />
                        Create Video
                      </>
                    )}
                  </Button>

                  {isGenerating && (
                    <div className="space-y-2">
                      <Progress value={progress} className="w-full" />
                      <p className="text-sm text-gray-600 text-center">
                        {progress < 40 ? 'Processing template...' :
                         progress < 80 ? 'Adding your content...' : 'Rendering final video...'}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Template Preview</CardTitle>
                </CardHeader>
                <CardContent>
                  {selectedTemplate && (
                    <div className="space-y-3">
                      <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                        <div className="text-center">
                          <FileVideo className="w-12 h-12 mx-auto text-gray-400 mb-2" />
                          <p className="text-sm text-gray-600">Template Preview</p>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">
                          {videoTemplates.find(t => t.id === selectedTemplate)?.name}
                        </h4>
                        <div className="space-y-2">
                          {videoTemplates.find(t => t.id === selectedTemplate)?.elements.map(element => (
                            <div key={element} className="flex items-center space-x-2">
                              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                              <span className="text-sm text-gray-600">{element}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Programmatic Generation Tab */}
        <TabsContent value="programmatic" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Settings className="w-5 h-5" />
                    <span>Programmatic Videos</span>
                  </CardTitle>
                  <CardDescription>
                    Create videos programmatically with scenes and animations
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Video Scenes</h4>
                    <Button onClick={addScene} variant="outline" size="sm">
                      Add Scene
                    </Button>
                  </div>

                  <div className="space-y-3">
                    {scenes.map((scene, index) => (
                      <div key={index} className="p-4 border rounded-lg space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">Scene {index + 1}</span>
                          <Button 
                            onClick={() => removeScene(index)} 
                            variant="ghost" 
                            size="sm"
                            className="text-red-600 hover:text-red-700"
                          >
                            Remove
                          </Button>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-sm font-medium mb-1">Type</label>
                            <Select 
                              value={scene.type} 
                              onValueChange={(value) => updateScene(index, 'type', value)}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="text">Text</SelectItem>
                                <SelectItem value="chart">Chart</SelectItem>
                                <SelectItem value="image">Image</SelectItem>
                                <SelectItem value="animation">Animation</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div>
                            <label className="block text-sm font-medium mb-1">Duration (s)</label>
                            <Input
                              type="number"
                              min="1"
                              max="10"
                              value={scene.duration}
                              onChange={(e) => updateScene(index, 'duration', parseInt(e.target.value))}
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-1">Content</label>
                          <Input
                            placeholder={
                              scene.type === 'text' ? 'Enter text content...' :
                              scene.type === 'chart' ? 'Select chart data...' :
                              scene.type === 'image' ? 'Upload image...' :
                              'Configure animation...'
                            }
                            value={scene.content}
                            onChange={(e) => updateScene(index, 'content', e.target.value)}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <Button 
                    onClick={generateProgrammaticVideo} 
                    disabled={scenes.length === 0 || isGenerating}
                    className="w-full"
                  >
                    {isGenerating ? (
                      <>
                        <Clock className="w-4 h-4 mr-2 animate-spin" />
                        Generating Video...
                      </>
                    ) : (
                      <>
                        <Settings className="w-4 h-4 mr-2" />
                        Generate Video
                      </>
                    )}
                  </Button>

                  {isGenerating && (
                    <div className="space-y-2">
                      <Progress value={progress} className="w-full" />
                      <p className="text-sm text-gray-600 text-center">
                        {progress < 25 ? 'Setting up scenes...' :
                         progress < 50 ? 'Rendering scene 1...' :
                         progress < 75 ? 'Rendering scene 2...' : 'Finalizing video...'}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Canvas Preview</CardTitle>
                </CardHeader>
                <CardContent>
                  <canvas 
                    ref={canvasRef}
                    className="w-full border rounded-lg"
                    style={{ aspectRatio: '16/9' }}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Video Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium mb-1">Resolution</label>
                    <Select defaultValue="1080p">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="720p">720p (HD)</SelectItem>
                        <SelectItem value="1080p">1080p (Full HD)</SelectItem>
                        <SelectItem value="4k">4K (Ultra HD)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Frame Rate</label>
                    <Select defaultValue="30">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="24">24 fps</SelectItem>
                        <SelectItem value="30">30 fps</SelectItem>
                        <SelectItem value="60">60 fps</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Quality</label>
                    <Select defaultValue="high">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="lossless">Lossless</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Generated Video Preview */}
      {generatedVideo && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Play className="w-5 h-5" />
              <span>Generated Video</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                  {generatedVideo.type === 'programmatic' ? (
                    <img 
                      src={generatedVideo.url} 
                      alt="Generated video frame"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <div className="text-center">
                      <Play className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                      <p className="text-gray-600">Video Preview</p>
                      <p className="text-sm text-gray-500">Click to play when ready</p>
                    </div>
                  )}
                </div>
                <div className="flex space-x-3">
                  <Button className="flex-1">
                    <Play className="w-4 h-4 mr-2" />
                    Play Video
                  </Button>
                  <Button variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Video Details</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Type:</span>
                      <span className="capitalize">{generatedVideo.type.replace('-', ' ')}</span>
                    </div>
                    {generatedVideo.provider && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Provider:</span>
                        <span className="capitalize">{generatedVideo.provider}</span>
                      </div>
                    )}
                    {generatedVideo.duration && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Duration:</span>
                        <span>{generatedVideo.duration}s</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-gray-600">Created:</span>
                      <span>{new Date(generatedVideo.createdAt).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
                {generatedVideo.prompt && (
                  <div>
                    <h4 className="font-medium mb-2">Prompt</h4>
                    <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                      {generatedVideo.prompt}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Video History */}
      {videoHistory.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Video History</CardTitle>
            <CardDescription>Your recently generated videos</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {videoHistory.slice(0, 6).map(video => (
                <div key={video.id} className="border rounded-lg p-4 space-y-3">
                  <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                    <img 
                      src={video.thumbnail} 
                      alt="Video thumbnail"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline" className="text-xs">
                        {video.type.replace('-', ' ')}
                      </Badge>
                      <span className="text-xs text-gray-500">
                        {new Date(video.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    {video.prompt && (
                      <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                        {video.prompt}
                      </p>
                    )}
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" className="flex-1">
                        <Play className="w-3 h-3 mr-1" />
                        Play
                      </Button>
                      <Button size="sm" variant="outline">
                        <Download className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default VideoGenerator;