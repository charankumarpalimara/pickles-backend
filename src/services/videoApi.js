import axios from 'axios';

// Video API service for integrating with multiple AI video providers
class VideoApiService {
  constructor() {
    this.providers = {
      runway: {
        name: 'Runway Gen-3',
        apiUrl: 'https://api.runwayml.com/v1/generate',
        pricing: 0.95, // per second
        maxDuration: 30,
        features: ['text-to-video', 'image-to-video', 'camera-controls']
      },
      pika: {
        name: 'Pika Labs',
        apiUrl: 'https://api.pikalabs.com/v1/generate',
        pricing: 0.50,
        maxDuration: 15,
        features: ['text-to-video', 'style-transfer', 'animation']
      },
      kling: {
        name: 'Kling AI',
        apiUrl: 'https://api.kling.ai/v1/generate',
        pricing: 0.30,
        maxDuration: 60,
        features: ['text-to-video', 'long-duration', 'motion-control']
      },
      luma: {
        name: 'Luma Dream Machine',
        apiUrl: 'https://api.lumalabs.ai/v1/generate',
        pricing: 0.25,
        maxDuration: 20,
        features: ['text-to-video', 'quick-generation', 'batch-processing']
      }
    };
  }

  // Generate video using specified provider
  async generateVideo(provider, options) {
    try {
      const providerConfig = this.providers[provider];
      if (!providerConfig) {
        throw new Error(`Provider ${provider} not supported`);
      }

      // Validate options
      this.validateOptions(options, providerConfig);

      // For demo purposes, we'll simulate the API call
      // In production, you would make actual API calls to the providers
      const response = await this.simulateApiCall(provider, options);
      
      return {
        success: true,
        videoId: response.id,
        status: 'processing',
        estimatedTime: options.duration * 2, // seconds
        provider: provider,
        cost: this.calculateCost(provider, options.duration)
      };

    } catch (error) {
      console.error(`Video generation failed for ${provider}:`, error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Validate generation options
  validateOptions(options, providerConfig) {
    if (!options.prompt) {
      throw new Error('Prompt is required');
    }

    if (options.duration > providerConfig.maxDuration) {
      throw new Error(`Duration exceeds maximum for this provider (${providerConfig.maxDuration}s)`);
    }

    if (options.duration < 1) {
      throw new Error('Duration must be at least 1 second');
    }
  }

  // Calculate cost based on provider and duration
  calculateCost(provider, duration) {
    const providerConfig = this.providers[provider];
    return (providerConfig.pricing * duration).toFixed(2);
  }

  // Simulate API call (replace with actual API integration)
  async simulateApiCall(provider, options) {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    return {
      id: `${provider}_${Date.now()}`,
      status: 'processing',
      prompt: options.prompt,
      duration: options.duration,
      style: options.style,
      aspectRatio: options.aspectRatio
    };
  }

  // Check video generation status
  async checkStatus(videoId, provider) {
    try {
      // Simulate status check
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Mock different statuses based on time
      const statuses = ['processing', 'processing', 'completed'];
      const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
      
      return {
        id: videoId,
        status: randomStatus,
        progress: randomStatus === 'completed' ? 100 : Math.floor(Math.random() * 90) + 10,
        videoUrl: randomStatus === 'completed' ? `https://example.com/videos/${videoId}.mp4` : null,
        thumbnailUrl: `https://example.com/thumbnails/${videoId}.jpg`
      };

    } catch (error) {
      console.error('Status check failed:', error);
      return {
        id: videoId,
        status: 'error',
        error: error.message
      };
    }
  }

  // Get available providers
  getProviders() {
    return Object.entries(this.providers).map(([key, config]) => ({
      id: key,
      ...config
    }));
  }

  // Yukthitech-specific video generation
  async generateYukthitechVideo(videoType, customOptions = {}) {
    const prompts = {
      'company-intro': `Create a professional, modern video for Yukthitech Solutions, a leading technology company. Show sleek office environments with developers working on computers, mobile devices displaying modern apps, and web interfaces on large monitors. Include futuristic tech elements, clean geometric animations, and a professional blue and white color scheme. The video should convey innovation, expertise, and reliability in software development.`,
      
      'services-showcase': `Generate a dynamic video showcasing Yukthitech Solutions' core services: mobile app development and web full-stack development. Show smooth transitions between mobile phone screens displaying beautiful apps, desktop computers with modern web applications, coding environments, and developers collaborating. Include tech icons, circuit board patterns, and modern UI elements. Style should be sleek, professional, and technology-focused with smooth animations.`,
      
      'portfolio-demo': `Create an impressive portfolio showcase video for Yukthitech Solutions. Display various mobile applications on different devices (iPhone, Android), responsive web applications on laptops and desktops, e-commerce platforms, and business applications. Show the development process with code editors, design tools, and team collaboration. Include client testimonials text overlays and project statistics. Modern, professional style with smooth transitions.`,
      
      'social-media': `Generate a fast-paced, engaging social media video for Yukthitech Solutions. Quick cuts showing mobile apps launching, web pages loading, developers high-fiving, modern office space, and tech devices. Include trendy transitions, bold text overlays with "Mobile Apps", "Web Development", "Full Stack Solutions", and company branding. Energetic, modern style perfect for Instagram, LinkedIn, and Facebook.`
    };

    const defaultOptions = {
      prompt: prompts[videoType] || prompts['company-intro'],
      duration: videoType === 'social-media' ? 15 : videoType === 'company-intro' ? 30 : 45,
      style: 'professional-modern',
      aspectRatio: '16:9',
      quality: 'high',
      ...customOptions
    };

    // Use the best provider for the video type
    const provider = this.selectBestProvider(videoType);
    
    return await this.generateVideo(provider, defaultOptions);
  }

  // Select best provider based on video type
  selectBestProvider(videoType) {
    const providerMap = {
      'company-intro': 'runway', // Best for professional corporate videos
      'services-showcase': 'kling', // Good for longer, detailed videos
      'portfolio-demo': 'runway', // High quality for showcasing work
      'social-media': 'pika' // Fast and creative for social content
    };

    return providerMap[videoType] || 'runway';
  }

  // Batch generate multiple videos
  async batchGenerate(requests) {
    const results = [];
    
    for (const request of requests) {
      try {
        const result = await this.generateVideo(request.provider, request.options);
        results.push({
          ...result,
          requestId: request.id
        });
      } catch (error) {
        results.push({
          success: false,
          error: error.message,
          requestId: request.id
        });
      }
    }

    return results;
  }

  // Get video templates for different use cases
  getVideoTemplates() {
    return [
      {
        id: 'tech-company-intro',
        name: 'Tech Company Introduction',
        description: 'Professional company overview for technology businesses',
        duration: '30s',
        style: 'corporate-modern',
        elements: ['Company branding', 'Office environments', 'Team shots', 'Technology showcase'],
        price: '$28.50'
      },
      {
        id: 'product-showcase',
        name: 'Product/Service Showcase',
        description: 'Highlight your mobile apps and web solutions',
        duration: '45s',
        style: 'tech-focused',
        elements: ['Product demos', 'Feature highlights', 'UI animations', 'Call-to-action'],
        price: '$42.75'
      },
      {
        id: 'portfolio-presentation',
        name: 'Portfolio Presentation',
        description: 'Showcase your best projects and capabilities',
        duration: '60s',
        style: 'project-focused',
        elements: ['Project galleries', 'Case studies', 'Client testimonials', 'Statistics'],
        price: '$57.00'
      },
      {
        id: 'social-promo',
        name: 'Social Media Promotion',
        description: 'Quick, engaging content for social platforms',
        duration: '15s',
        style: 'dynamic-modern',
        elements: ['Quick cuts', 'Bold text', 'Trending effects', 'Brand colors'],
        price: '$7.50'
      }
    ];
  }

  // Enhanced error handling
  handleApiError(error, provider) {
    const errorMap = {
      400: 'Invalid request parameters',
      401: 'Authentication failed - check API key',
      403: 'Insufficient credits or permissions',
      429: 'Rate limit exceeded - please try again later',
      500: 'Provider server error - please try again',
      503: 'Service temporarily unavailable'
    };

    const message = errorMap[error.status] || error.message || 'Unknown error occurred';
    
    console.error(`${provider} API Error:`, {
      status: error.status,
      message: message,
      timestamp: new Date().toISOString()
    });

    return {
      success: false,
      error: message,
      provider: provider,
      retryable: [429, 500, 503].includes(error.status)
    };
  }
}

// Export singleton instance
export const videoApiService = new VideoApiService();

// Export class for testing
export { VideoApiService };

// Utility functions
export const formatDuration = (seconds) => {
  if (seconds < 60) {
    return `${seconds}s`;
  }
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return remainingSeconds > 0 ? `${minutes}m ${remainingSeconds}s` : `${minutes}m`;
};

export const formatCost = (cost) => {
  return `$${parseFloat(cost).toFixed(2)}`;
};

export const getVideoTypeRecommendation = (purpose, duration, budget) => {
  if (purpose === 'social' && duration <= 15) {
    return 'pika';
  } else if (purpose === 'corporate' && budget >= 50) {
    return 'runway';
  } else if (duration > 30) {
    return 'kling';
  } else {
    return 'luma';
  }
};