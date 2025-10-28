// OpenAI API Service for PC Component Recommendations

interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

interface ComponentRecommendationRequest {
  budget: string;
  componentType: string;
  preferences?: string;
  currentBuild?: any;
}

class OpenAIService {
  private apiKey: string;
  private baseURL = "https://api.openai.com/v1/chat/completions";

  constructor() {
    console.log('Initializing OpenAI Service...');
    console.log('Environment variables available:', import.meta.env);
    
    // Use import.meta.env for Vite-based environments, with fallback
    let envApiKey: string | undefined;
    try {
      envApiKey = import.meta?.env?.VITE_OPENAI_API_KEY;
      console.log('API Key found in env?', !!envApiKey);
      console.log('API Key length:', envApiKey?.length || 0);
      console.log('First 4 chars of API key:', envApiKey?.substring(0, 4) || 'none');
    } catch (error) {
      console.error('Error accessing env variables:', error);
      envApiKey = undefined;
    }
    
    this.apiKey = envApiKey || "YOUR_API_KEY_HERE";

    // Log configuration status (without exposing the actual key)
    if (this.apiKey === "YOUR_API_KEY_HERE") {
      console.warn(
        "OpenAI API key not configured. Using mock responses.",
      );
    } else {
      console.info("OpenAI API key configured successfully.");
    }
  }

  private createSystemPrompt(
    budget: string,
    componentType: string,
  ): string {
    return `You are an expert PC builder assistant. The user has a budget of $${budget} and is looking for ${componentType} recommendations. 

Your task is to:
1. Recommend specific components that fit their budget
2. Explain why each recommendation is suitable
3. Consider price-to-performance ratio
4. Mention compatibility considerations
5. Keep responses concise but informative
6. Always include specific product names and approximate prices

Context: This is for a PC builder application where users select components step by step. Focus on practical, available components that represent good value for the specified budget range.`;
  }

  async getComponentRecommendation(
    request: ComponentRecommendationRequest,
  ): Promise<string> {
    // Check if API key is configured
    if (!this.apiKey || this.apiKey === "YOUR_API_KEY_HERE") {
      return this.getMockRecommendation(request);
    }

    try {
      const messages: ChatMessage[] = [
        {
          role: "system",
          content: this.createSystemPrompt(
            request.budget,
            request.componentType,
          ),
        },
        {
          role: "user",
          content: `I need recommendations for a ${request.componentType} with a budget of $${request.budget}. ${request.preferences ? `Additional preferences: ${request.preferences}` : ""}`,
        },
      ];

      const response = await fetch(this.baseURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: messages,
          max_tokens: 500,
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.status}`);
      }

      const data = await response.json();
      return (
        data.choices[0]?.message?.content ||
        "Sorry, I could not generate a recommendation at this time."
      );
    } catch (error) {
      console.error("OpenAI API Error:", error);
      // Fallback to mock recommendation
      return this.getMockRecommendation(request);
    }
  }

  private getMockRecommendation(
    request: ComponentRecommendationRequest,
  ): string {
    // Mock responses for demonstration purposes
    const mockResponses: Record<
      string,
      Record<string, string>
    > = {
      "500-800": {
        cpu: "For your $500-800 budget, I recommend the **AMD Ryzen 5 5600** (~$140) as your best option. This 6-core processor offers excellent gaming performance and efficiency. It's perfect for 1080p gaming and handles modern titles smoothly. The Intel Core i5-12400F (~$160) is also solid if you prefer Intel. Both offer great price-to-performance ratios in this budget range.",
        gpu: "In the $500-800 range, the **AMD Radeon RX 6600** (~$200) is your sweet spot for 1080p gaming. It delivers excellent performance in modern games at high settings. If you can stretch the budget slightly, the RX 6650 XT (~$240) offers even better performance. These cards provide great value and will handle current games beautifully.",
        motherboard:
          "For this budget, the **MSI B550-A PRO** (~$120) is excellent for AMD builds, offering PCIe 4.0 support and solid features. If going Intel, consider the MSI Pro B660M-A DDR4 (~$125). Both provide reliable connectivity and room for future upgrades.",
        ram: "Go with **Corsair Vengeance LPX 16GB DDR4-3200** (~$50) for reliable performance. This dual-channel kit offers great compatibility and is perfect for gaming. The speed is ideal for both AMD and Intel systems in this price range.",
        storage:
          "The **Crucial P3 Plus 1TB NVMe** (~$55) is perfect for your budget. It's a fast PCIe 4.0 SSD that will make your system feel snappy. 1TB gives you plenty of space for your OS, games, and files without breaking the budget.",
        psu: "The **EVGA 600 BR 600W Bronze** (~$45) or **Corsair CX650M** (~$65) are both reliable choices. The Corsair offers semi-modular cables for better cable management, while the EVGA is more budget-friendly but still dependable.",
        case: "The **NZXT H510** (~$70) offers clean aesthetics and good build quality, or the **Phanteks Eclipse P300A** (~$60) if you prioritize airflow. Both are excellent mid-tower cases that are easy to build in.",
        cooler:
          "At this budget, the stock cooler included with your CPU is perfectly adequate. AMD's Wraith Stealth and Intel's stock coolers handle normal gaming loads without issues, saving money for other components.",
      },
      "800-1200": {
        cpu: "For $800-1200 builds, the **Intel Core i5-13400F** (~$220) is exceptional with its hybrid architecture offering great multi-threading. The **AMD Ryzen 5 7600** (~$230) on the newer AM5 platform is also excellent. Both handle 1440p gaming and productivity tasks with ease.",
        gpu: "The **AMD RX 6700 XT** (~$330) dominates 1440p gaming with 12GB VRAM for future-proofing. Alternatively, the **NVIDIA RTX 4060 Ti** (~$350-400) offers ray tracing and DLSS 3 support. Both are perfect for high-refresh 1440p gaming.",
        motherboard:
          "The **MSI B650 Tomahawk WiFi** (~$190) is fantastic for AMD AM5 builds with WiFi and excellent connectivity. For Intel, the **Gigabyte B660 Aorus Pro DDR4** (~$180) offers robust power delivery and premium features.",
        ram: "Upgrade to **Corsair Vengeance DDR5-5600 16GB** (~$65) for AM5 builds, or **TeamGroup T-Force Delta RGB DDR4-3600** (~$65) for AM4/Intel. The faster speeds provide noticeable improvements in gaming and productivity.",
        storage:
          "The **WD Black SN850X 1TB** (~$85) offers top-tier gaming performance with fast load times. For value, the **Crucial P5 Plus 1TB** (~$70) provides excellent PCIe 4.0 performance at a lower price point.",
        psu: "Step up to the **Corsair RM750e 750W Gold** (~$100) for excellent efficiency and fully modular cables. The **Seasonic Focus GX-750** (~$120) is also premium with Japanese capacitors and 10-year warranty.",
        case: "The **NZXT H510 Flow** (~$80) improves on the classic H510 with better airflow, or the **Lian Li Lancool 215** (~$100) offers excellent value with pre-installed fans and great cooling performance.",
        cooler:
          "Stock coolers are still adequate, but you might consider the **be quiet! Pure Rock Slim 2** (~$25) for quieter operation if noise is a concern. Most users will be fine with stock cooling at this performance level.",
      },
      "1200-2000": {
        cpu: "In the $1200-2000 range, the **Intel Core i5-13600K** (~$320) offers incredible gaming performance with overclocking potential. The **AMD Ryzen 7 7800X** (~$350-420) is also excellent for gaming with the latest AM5 platform benefits.",
        gpu: "Go big with the **NVIDIA RTX 4070** (~$600) for excellent 1440p ray tracing or the **AMD RX 7800 XT** (~$600) for exceptional rasterization performance. Both handle 1440p gaming at maximum settings beautifully.",
        motherboard:
          "The **MSI PRO Z790-A WiFi DDR5** (~$220) unlocks overclocking for Intel builds, while the **ASUS ROG Strix B650E-F** (~$250) offers premium gaming features for AMD. Both support the latest technologies.",
        ram: "Invest in **16GB DDR5-6000** (~$85) for optimal performance with modern platforms. Consider **32GB** (~$150-200) if you do content creation or want future-proofing for demanding applications.",
        storage:
          "Stick with reliable options like **Crucial P3 Plus 1TB** (~$55) or upgrade to **Samsung 980 Pro 2TB** (~$160) if you need more capacity. Fast storage makes a noticeable difference in this performance tier.",
        psu: "The **Corsair RM850x** (~$140) or **Seasonic Focus GX-850** (~$150) provide excellent power delivery for high-end components with room for future upgrades. 80+ Gold efficiency saves money long-term.",
        case: "The **Phanteks Eclipse P500A** (~$130) offers maximum airflow for high-performance components, or the **Lian Li Lancool II Mesh RGB** (~$120) combines excellent cooling with RGB aesthetics.",
        cooler:
          "Now you should consider the **be quiet! Dark Rock Pro 5** (~$95) or **Noctua NH-D15** (~$100) for premium air cooling, or the **Arctic Liquid Freezer II 240mm** (~$120-150) for AIO liquid cooling and lower temperatures.",
      },
      "2000+": {
        cpu: "For $2000+ builds, go flagship with the **AMD Ryzen 9 7950X3D** (~$650-700) for ultimate gaming performance with 3D V-Cache, or the **AMD Ryzen 9 7950X** (~$600) for maximum multi-core performance in productivity workloads.",
        gpu: "Flagship options: **NVIDIA RTX 4080 Super** (~$1,050) for exceptional 4K gaming, or the **AMD RX 7900 XTX** (~$1,000) for outstanding 4K rasterization. The RTX 4090 (~$1,800-2,000) is ultimate performance but very expensive.",
        motherboard:
          "Premium boards like the **ASUS ROG Maximus Z790 Hero** (~$550) for Intel or **ASUS ROG Crosshair X670E Hero** (~$550) for AMD offer every feature imaginable and top-tier overclocking capabilities.",
        ram: "Go for **32GB DDR5-6000 CL30** (~$180-220) for optimal performance. Brands like **G.Skill Trident Z5** or **Corsair Dominator** offer premium kits with tight timings for maximum performance.",
        storage:
          "The **Samsung 990 Pro 2TB** (~$180) offers flagship NVMe performance, or the **WD Black SN850X 4TB** (~$350) for maximum capacity. Consider PCIe 5.0 drives like **Crucial T700** for future-proofing.",
        psu: "Premium PSUs like the **Corsair RM1200e** (~$220) or **ASUS Thor 1200W Platinum II** (~$350) with OLED displays provide ample power and premium features for flagship builds.",
        case: "Flagship cases: **Lian Li O11 Dynamic XL** (~$200) for stunning builds and dual-chamber design, or **Fractal Design Torrent** (~$220) for maximum airflow and cooling performance.",
        cooler:
          "Premium options: **Noctua NH-D15 chromax.black** (~$110) for top-tier air cooling, or **Arctic Liquid Freezer II 360** (~$160) for maximum cooling performance. The **NZXT Kraken Z73** (~$250) adds LCD display and RGB.",
      },
    };

    const budgetResponses =
      mockResponses[request.budget] ||
      mockResponses["800-1200"];
    return (
      budgetResponses[request.componentType] ||
      "I'd be happy to help you choose the right component for your build! Could you provide more details about your specific needs and preferences?"
    );
  }

  async getChatResponse(
    message: string,
    context?: any,
  ): Promise<string> {
    // Check if API key is configured
    if (!this.apiKey || this.apiKey === "YOUR_API_KEY_HERE") {
      return this.getMockChatResponse(message, context);
    }

    try {
      const messages: ChatMessage[] = [
        {
          role: "system",
          content: `You are an expert PC building assistant. Help users choose the best components for their budget and needs. Be specific with product recommendations and prices. Keep responses helpful and concise.`,
        },
        {
          role: "user",
          content: message,
        },
      ];

      const response = await fetch(this.baseURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${this.apiKey}`,
          "Accept": "application/json",
        },
        mode: "cors",
        cache: "no-cache",
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: messages,
          max_tokens: 400,
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.status}`);
      }

      const data = await response.json();
      return (
        data.choices[0]?.message?.content ||
        "Sorry, I could not process your request at this time."
      );
    } catch (error) {
      console.error("OpenAI API Error:", error);
      return this.getMockChatResponse(message, context);
    }
  }

  private getMockChatResponse(
    message: string,
    context?: any,
  ): string {
    const lowerMessage = message.toLowerCase();

    if (
      lowerMessage.includes("budget") ||
      lowerMessage.includes("price")
    ) {
      return "I'd be happy to help you find components that fit your budget! What's your target price range, and what type of PC are you building (gaming, productivity, etc.)?";
    }

    if (lowerMessage.includes("gaming")) {
      return "For gaming builds, I typically recommend prioritizing your GPU budget, then CPU, then other components. What's your total budget and what resolution/settings are you targeting?";
    }

    if (lowerMessage.includes("compatibility")) {
      return "Great question about compatibility! The main things to check are: CPU socket matching motherboard, RAM type (DDR4/DDR5), power supply wattage, and GPU clearance in your case. What specific components are you considering?";
    }

    return "I'm here to help you build the perfect PC! Feel free to ask about component recommendations, compatibility, or budget optimization. What would you like to know?";
  }
}

export const openAIService = new OpenAIService();
export type { ComponentRecommendationRequest };