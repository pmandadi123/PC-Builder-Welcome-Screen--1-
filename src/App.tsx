import React from "react";
import { Button } from "./components/ui/button";
import { Card } from "./components/ui/card";
import { Badge } from "./components/ui/badge";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";
import { ImageWithFallback } from "./components/figma/ImageWithFallback";
import { motion } from "motion/react";
import { Monitor, Cpu, HardDrive, Zap, DollarSign, CheckCircle, ArrowRight, ArrowLeft, Sparkles, MemoryStick, CircuitBoard, Plug, Box, Wind, MessageCircle } from "lucide-react";
import { useState } from "react";
import AIRecommendationChat from "./components/AIRecommendationChat";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<"welcome" | "budget" | "components" | "cpu" | "gpu" | "motherboard" | "ram" | "storage" | "psu" | "case" | "cooler" | "summary">("welcome");
  const [budget, setBudget] = useState("");
  const [budgetLocked, setBudgetLocked] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState("");
  const [selectedCPU, setSelectedCPU] = useState<any>(null);
  const [selectedGPU, setSelectedGPU] = useState<any>(null);
  const [selectedMotherboard, setSelectedMotherboard] = useState<any>(null);
  const [selectedRAM, setSelectedRAM] = useState<any>(null);
  const [selectedStorage, setSelectedStorage] = useState<any>(null);
  const [selectedPSU, setSelectedPSU] = useState<any>(null);
  const [selectedCase, setSelectedCase] = useState<any>(null);
  const [selectedCooler, setSelectedCooler] = useState<any>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const features = [
    { icon: DollarSign, text: "Budget-friendly builds" },
    { icon: Cpu, text: "Performance optimized" },
    { icon: CheckCircle, text: "Compatibility guaranteed" }
  ];

  const budgetRanges = [
    { label: "$500 - $800", value: "500-800", description: "Budget Build" },
    { label: "$800 - $1200", value: "800-1200", description: "Mid-Range Build" },
    { label: "$1200 - $2000", value: "1200-2000", description: "Performance Build" },
    { label: "$2000+", value: "2000+", description: "Enthusiast / High-End Build" }
  ];

  const pcComponents = [
    { 
      name: "Central Processing Unit (CPU)", 
      value: "cpu",
      description: "The brain of your computer",
      icon: Cpu,
      color: "blue"
    },
    { 
      name: "Graphics Processing Unit (GPU)", 
      value: "gpu",
      description: "Powers your gaming and visual performance",
      icon: Monitor,
      color: "purple"
    },
    { 
      name: "Motherboard", 
      value: "motherboard",
      description: "Connects all your components together",
      icon: CircuitBoard,
      color: "green"
    },
    { 
      name: "Random Access Memory (RAM)", 
      value: "ram",
      description: "Provides fast access to active programs",
      icon: MemoryStick,
      color: "orange"
    },
    { 
      name: "Storage (SSD or Hard Drive)", 
      value: "storage",
      description: "Stores your operating system and files",
      icon: HardDrive,
      color: "cyan"
    },
    { 
      name: "Power Supply Unit (PSU)", 
      value: "psu",
      description: "Supplies power to all components",
      icon: Plug,
      color: "red"
    },
    { 
      name: "Computer Case", 
      value: "case",
      description: "Houses and protects your components",
      icon: Box,
      color: "gray"
    },
    { 
      name: "CPU Cooler", 
      value: "cooler",
      description: "Keeps your processor running cool",
      icon: Wind,
      color: "teal"
    }
  ];

  // CPU Data for different budget ranges
  const cpuData = {
    "500-800": [
      {
        name: "AMD Ryzen 5 5600",
        value: "ryzen-5600",
        description: "Excellent 6-core gaming performance with great efficiency",
        price: "~$140",
        brand: "AMD",
        recommended: true
      },
      {
        name: "Intel Core i5-12400F",
        value: "i5-12400f",
        description: "Strong gaming CPU with excellent price-to-performance ratio",
        price: "~$160",
        brand: "Intel",
        recommended: true
      },
      {
        name: "AMD Ryzen 5 5500",
        value: "ryzen-5500",
        description: "Budget-friendly option with solid gaming performance",
        price: "~$110",
        brand: "AMD",
        recommended: false
      }
    ],
    "800-1200": [
      {
        name: "Intel Core i5-13400F",
        value: "i5-13400f",
        description: "Latest generation with excellent multi-threading performance",
        price: "~$220",
        brand: "Intel",
        recommended: true
      },
      {
        name: "AMD Ryzen 5 7600",
        value: "ryzen-7600",
        description: "Modern AM5 platform with strong single-thread performance",
        price: "~$230",
        brand: "AMD",
        recommended: true
      },
      {
        name: "AMD Ryzen 7 5700X",
        value: "ryzen-5700x",
        description: "8-core processor with excellent value for productivity",
        price: "~$240",
        brand: "AMD",
        recommended: false
      }
    ],
    "1200-2000": [
      {
        name: "Intel Core i5-13600K",
        value: "i5-13600k",
        description: "High-performance gaming CPU with overclocking support",
        price: "~$320",
        brand: "Intel",
        recommended: true
      },
      {
        name: "Intel Core i7-13700K",
        value: "i7-13700k",
        description: "Premium performance for gaming and content creation",
        price: "~$400",
        brand: "Intel",
        recommended: false
      },
      {
        name: "AMD Ryzen 7 7800X",
        value: "ryzen-7800x",
        description: "High-end AM5 processor with excellent gaming performance",
        price: "~$350–$420",
        brand: "AMD",
        recommended: true
      }
    ],
    "2000+": [
      {
        name: "Intel Core i9-14900K",
        value: "i9-14900k",
        description: "Flagship Intel processor for ultimate performance",
        price: "~$650",
        brand: "Intel",
        recommended: false
      },
      {
        name: "AMD Ryzen 9 7950X3D",
        value: "ryzen-7950x3d",
        description: "Top-tier gaming performance with 3D V-Cache technology",
        price: "~$650–$700",
        brand: "AMD",
        recommended: true
      },
      {
        name: "AMD Ryzen 9 7950X",
        value: "ryzen-7950x",
        description: "16-core powerhouse for demanding workloads",
        price: "~$600",
        brand: "AMD",
        recommended: true
      }
    ]
  };

  // GPU Data for different budget ranges
  const gpuData = {
    "500-800": [
      {
        name: "AMD Radeon RX 6600",
        value: "rx-6600",
        description: "Solid 1080p gaming performance with great efficiency",
        price: "~$200",
        brand: "AMD",
        recommended: true
      },
      {
        name: "NVIDIA RTX 3060",
        value: "rtx-3060",
        description: "Ray tracing capable with DLSS support for enhanced performance",
        price: "~$270",
        brand: "NVIDIA",
        recommended: false
      },
      {
        name: "AMD Radeon RX 6650 XT",
        value: "rx-6650xt",
        description: "Enhanced version of RX 6600 with better performance",
        price: "~$240",
        brand: "AMD",
        recommended: true
      }
    ],
    "800-1200": [
      {
        name: "AMD RX 6700 XT",
        value: "rx-6700xt",
        description: "Excellent 1440p gaming performance with 12GB VRAM",
        price: "~$330",
        brand: "AMD",
        recommended: true
      },
      {
        name: "NVIDIA RTX 4060 Ti",
        value: "rtx-4060ti",
        description: "Latest generation with improved ray tracing and DLSS 3",
        price: "~$350–$400",
        brand: "NVIDIA",
        recommended: false
      },
      {
        name: "AMD RX 6750 XT",
        value: "rx-6750xt",
        description: "High-performance 1440p gaming with excellent value",
        price: "~$380–$420",
        brand: "AMD",
        recommended: true
      }
    ],
    "1200-2000": [
      {
        name: "NVIDIA RTX 4070",
        value: "rtx-4070",
        description: "Premium 1440p performance with advanced ray tracing",
        price: "~$600",
        brand: "NVIDIA",
        recommended: true
      },
      {
        name: "AMD RX 7800 XT",
        value: "rx-7800xt",
        description: "High-end RDNA 3 architecture with excellent rasterization",
        price: "~$600",
        brand: "AMD",
        recommended: true
      },
      {
        name: "NVIDIA RTX 4070 Ti",
        value: "rtx-4070ti",
        description: "High-performance gaming with 4K capability",
        price: "~$750",
        brand: "NVIDIA",
        recommended: false
      }
    ],
    "2000+": [
      {
        name: "NVIDIA RTX 4080 Super",
        value: "rtx-4080super",
        description: "Top-tier 4K gaming performance with advanced features",
        price: "~$1,050",
        brand: "NVIDIA",
        recommended: true
      },
      {
        name: "AMD Radeon RX 7900 XTX",
        value: "rx-7900xtx",
        description: "Flagship AMD GPU with exceptional 4K performance",
        price: "~$1,000",
        brand: "AMD",
        recommended: true
      },
      {
        name: "NVIDIA RTX 4090",
        value: "rtx-4090",
        description: "Ultimate gaming performance for enthusiasts",
        price: "~$1,800–$2,000",
        brand: "NVIDIA",
        recommended: false
      }
    ]
  };

  // Motherboard Data
  const motherboardData = {
    "500-800": [
      {
        name: "MSI B550-A PRO",
        value: "msi-b550a-pro",
        description: "Reliable AMD B550 chipset with PCIe 4.0 support",
        price: "~$120",
        brand: "MSI",
        socket: "AM4",
        recommended: true
      },
      {
        name: "ASRock B550M Pro4",
        value: "asrock-b550m-pro4",
        description: "Micro-ATX form factor with solid feature set",
        price: "~$100",
        brand: "ASRock",
        socket: "AM4",
        recommended: true
      },
      {
        name: "MSI Pro B660M-A DDR4",
        value: "msi-b660m-a-ddr4",
        description: "Intel B660 chipset with DDR4 memory support",
        price: "~$125",
        brand: "MSI",
        socket: "LGA1700",
        recommended: false
      }
    ],
    "800-1200": [
      {
        name: "MSI B650 Tomahawk WiFi",
        value: "msi-b650-tomahawk",
        description: "Modern AM5 platform with WiFi and excellent connectivity",
        price: "~$190",
        brand: "MSI",
        socket: "AM5",
        recommended: true
      },
      {
        name: "Gigabyte B660 Aorus Pro DDR4",
        value: "gigabyte-b660-aorus-pro",
        description: "Premium B660 board with robust power delivery",
        price: "~$180",
        brand: "Gigabyte",
        socket: "LGA1700",
        recommended: false
      },
      {
        name: "ASUS TUF Gaming B550-PLUS",
        value: "asus-tuf-b550-plus",
        description: "Gaming-focused with military-grade components",
        price: "~$160",
        brand: "ASUS",
        socket: "AM4",
        recommended: true
      }
    ],
    "1200-2000": [
      {
        name: "MSI PRO Z790-A WiFi DDR5",
        value: "msi-z790a-wifi",
        description: "High-end Z790 chipset with DDR5 and overclocking support",
        price: "~$220",
        brand: "MSI",
        socket: "LGA1700",
        recommended: true
      },
      {
        name: "ASUS ROG Strix B650E-F",
        value: "asus-rog-b650e-f",
        description: "Premium gaming motherboard with advanced features",
        price: "~$250",
        brand: "ASUS",
        socket: "AM5",
        recommended: true
      },
      {
        name: "Gigabyte X670 Aorus Elite",
        value: "gigabyte-x670-elite",
        description: "Flagship AM5 platform with extensive connectivity",
        price: "~$300",
        brand: "Gigabyte",
        socket: "AM5",
        recommended: false
      }
    ],
    "2000+": [
      {
        name: "ASUS ROG Maximus Z790 Hero",
        value: "asus-maximus-z790-hero",
        description: "Premium enthusiast motherboard with ultimate features",
        price: "~$550",
        brand: "ASUS",
        socket: "LGA1700",
        recommended: true
      },
      {
        name: "MSI MEG Z790 ACE",
        value: "msi-meg-z790-ace",
        description: "Flagship motherboard for extreme overclocking",
        price: "~$600",
        brand: "MSI",
        socket: "LGA1700",
        recommended: false
      },
      {
        name: "ASUS ROG Crosshair X670E Hero",
        value: "asus-crosshair-x670e-hero",
        description: "Top-tier AM5 board for enthusiast builds",
        price: "~$550",
        brand: "ASUS",
        socket: "AM5",
        recommended: true
      }
    ]
  };

  // RAM Data
  const ramData = {
    "500-800": [
      {
        name: "Corsair Vengeance LPX 16GB (2×8GB) DDR4-3200",
        value: "corsair-lpx-16gb-3200",
        description: "Reliable dual-channel DDR4 memory with low profile design",
        price: "~$50",
        brand: "Corsair",
        capacity: "16GB",
        type: "DDR4",
        recommended: true
      },
      {
        name: "G.Skill Ripjaws V 16GB DDR4-3600",
        value: "gskill-ripjaws-16gb-3600",
        description: "High-speed DDR4 memory for better gaming performance",
        price: "~$55",
        brand: "G.Skill",
        capacity: "16GB",
        type: "DDR4",
        recommended: true
      },
      {
        name: "TeamGroup T-Force Vulcan Z 16GB DDR4-3200",
        value: "teamgroup-vulcan-16gb-3200",
        description: "Budget-friendly option with solid performance",
        price: "~$45",
        brand: "TeamGroup",
        capacity: "16GB",
        type: "DDR4",
        recommended: false
      }
    ],
    "800-1200": [
      {
        name: "Corsair Vengeance 16GB DDR5-5600",
        value: "corsair-vengeance-16gb-5600",
        description: "Modern DDR5 memory for latest platforms",
        price: "~$65",
        brand: "Corsair",
        capacity: "16GB",
        type: "DDR5",
        recommended: true
      },
      {
        name: "G.Skill Ripjaws S5 16GB DDR5-6000",
        value: "gskill-ripjaws-s5-16gb-6000",
        description: "High-performance DDR5 with excellent speeds",
        price: "~$75",
        brand: "G.Skill",
        capacity: "16GB",
        type: "DDR5",
        recommended: false
      },
      {
        name: "TeamGroup T-Force Delta RGB DDR4-3600 16GB",
        value: "teamgroup-delta-rgb-16gb-3600",
        description: "RGB lighting with solid DDR4 performance",
        price: "~$65",
        brand: "TeamGroup",
        capacity: "16GB",
        type: "DDR4",
        recommended: true
      }
    ],
    "1200-2000": [
      {
        name: "16GB DDR5-6000 (Corsair Vengeance)",
        value: "corsair-vengeance-16gb-6000",
        description: "Premium DDR5 memory optimized for high-end systems",
        price: "~$85",
        brand: "Corsair",
        capacity: "16GB",
        type: "DDR5",
        recommended: true
      },
      {
        name: "32GB DDR5-5600/6000 (G.Skill Trident Z5)",
        value: "gskill-trident-z5-32gb-6000",
        description: "High-capacity memory for demanding workloads",
        price: "~$150–$200",
        brand: "G.Skill",
        capacity: "32GB",
        type: "DDR5",
        recommended: false
      },
      {
        name: "Kingston Fury Beast DDR5-6000",
        value: "kingston-fury-beast-ddr5-6000",
        description: "Reliable high-speed DDR5 with good compatibility",
        price: "~$120–$180",
        brand: "Kingston",
        capacity: "16GB-32GB",
        type: "DDR5",
        recommended: true
      }
    ],
    "2000+": [
      {
        name: "32GB DDR5-6000 CL30 (G.Skill Trident Z5)",
        value: "gskill-trident-z5-32gb-cl30",
        description: "Premium memory with tight timings for maximum performance",
        price: "~$180–$220",
        brand: "G.Skill",
        capacity: "32GB",
        type: "DDR5",
        recommended: true
      },
      {
        name: "32GB DDR5-6000 (Corsair Dominator)",
        value: "corsair-dominator-32gb-6000",
        description: "Flagship memory series with premium build quality",
        price: "~$180–$220",
        brand: "Corsair",
        capacity: "32GB",
        type: "DDR5",
        recommended: true
      },
      {
        name: "64GB DDR5-6000 (2×32GB)",
        value: "ddr5-64gb-6000",
        description: "Maximum capacity for professional workloads",
        price: "~$340–$380",
        brand: "Various",
        capacity: "64GB",
        type: "DDR5",
        recommended: false
      }
    ]
  };

  // Storage Data
  const storageData = {
    "500-800": [
      {
        name: "Crucial P3 Plus 1TB NVMe",
        value: "crucial-p3-plus-1tb",
        description: "Fast PCIe 4.0 SSD with excellent value for money",
        price: "~$55",
        brand: "Crucial",
        capacity: "1TB",
        type: "NVMe SSD",
        recommended: true
      },
      {
        name: "WD Blue SN570 1TB NVMe",
        value: "wd-blue-sn570-1tb",
        description: "Reliable NVMe storage with good performance",
        price: "~$60",
        brand: "Western Digital",
        capacity: "1TB",
        type: "NVMe SSD",
        recommended: true
      },
      {
        name: "Samsung 970 EVO Plus 500GB NVMe",
        value: "samsung-970-evo-plus-500gb",
        description: "Premium Samsung storage with smaller capacity",
        price: "~$45",
        brand: "Samsung",
        capacity: "500GB",
        type: "NVMe SSD",
        recommended: false
      }
    ],
    "800-1200": [
      {
        name: "WD Black SN850X 1TB NVMe",
        value: "wd-black-sn850x-1tb",
        description: "High-performance gaming SSD with fast speeds",
        price: "~$85",
        brand: "Western Digital",
        capacity: "1TB",
        type: "NVMe SSD",
        recommended: true
      },
      {
        name: "Crucial P5 Plus 1TB NVMe",
        value: "crucial-p5-plus-1tb",
        description: "PCIe 4.0 performance with reliable build quality",
        price: "~$70",
        brand: "Crucial",
        capacity: "1TB",
        type: "NVMe SSD",
        recommended: true
      },
      {
        name: "Samsung 980 1TB NVMe",
        value: "samsung-980-1tb",
        description: "Mainstream Samsung NVMe with good performance",
        price: "~$65",
        brand: "Samsung",
        capacity: "1TB",
        type: "NVMe SSD",
        recommended: false
      }
    ],
    "1200-2000": [
      {
        name: "Crucial P3 Plus 1TB",
        value: "crucial-p3-plus-1tb-perf",
        description: "Proven reliable storage solution",
        price: "~$55",
        brand: "Crucial",
        capacity: "1TB",
        type: "NVMe SSD",
        recommended: true
      },
      {
        name: "WD SN770 1TB",
        value: "wd-sn770-1tb",
        description: "Mid-range NVMe with balanced performance",
        price: "~$65",
        brand: "Western Digital",
        capacity: "1TB",
        type: "NVMe SSD",
        recommended: true
      },
      {
        name: "Samsung 980 Pro 2TB",
        value: "samsung-980-pro-2tb",
        description: "Premium storage with high capacity",
        price: "~$160",
        brand: "Samsung",
        capacity: "2TB",
        type: "NVMe SSD",
        recommended: false
      }
    ],
    "2000+": [
      {
        name: "Samsung 990 Pro 2TB",
        value: "samsung-990-pro-2tb",
        description: "Flagship NVMe SSD with maximum performance",
        price: "~$180",
        brand: "Samsung",
        capacity: "2TB",
        type: "NVMe SSD",
        recommended: true
      },
      {
        name: "Crucial T700 2TB PCIe 5.0",
        value: "crucial-t700-2tb",
        description: "Next-generation PCIe 5.0 storage for future-proofing",
        price: "~$280",
        brand: "Crucial",
        capacity: "2TB",
        type: "PCIe 5.0 NVMe",
        recommended: false
      },
      {
        name: "WD Black SN850X 4TB",
        value: "wd-black-sn850x-4tb",
        description: "Maximum capacity gaming storage",
        price: "~$350",
        brand: "Western Digital",
        capacity: "4TB",
        type: "NVMe SSD",
        recommended: true
      }
    ]
  };

  // PSU Data
  const psuData = {
    "500-800": [
      {
        name: "EVGA 600 BR 600W Bronze",
        value: "evga-600-br-600w",
        description: "Reliable 80+ Bronze efficiency power supply",
        price: "~$45",
        brand: "EVGA",
        wattage: "600W",
        efficiency: "80+ Bronze",
        recommended: true
      },
      {
        name: "Corsair CX650M 650W Bronze",
        value: "corsair-cx650m-650w",
        description: "Semi-modular design for better cable management",
        price: "~$65",
        brand: "Corsair",
        wattage: "650W",
        efficiency: "80+ Bronze",
        recommended: true
      },
      {
        name: "Thermaltake Smart 600W White",
        value: "thermaltake-smart-600w",
        description: "Budget-friendly option with white color scheme",
        price: "~$45",
        brand: "Thermaltake",
        wattage: "600W",
        efficiency: "80+ White",
        recommended: false
      }
    ],
    "800-1200": [
      {
        name: "Corsair RM750e 750W Gold",
        value: "corsair-rm750e-750w",
        description: "Fully modular 80+ Gold efficiency for better power delivery",
        price: "~$100",
        brand: "Corsair",
        wattage: "750W",
        efficiency: "80+ Gold",
        recommended: true
      },
      {
        name: "Seasonic Focus GX-750",
        value: "seasonic-focus-gx-750",
        description: "Premium Japanese capacitors with 10-year warranty",
        price: "~$120",
        brand: "Seasonic",
        wattage: "750W",
        efficiency: "80+ Gold",
        recommended: true
      },
      {
        name: "EVGA SuperNOVA 750 G6",
        value: "evga-supernova-750-g6",
        description: "High-quality modular PSU with excellent performance",
        price: "~$110",
        brand: "EVGA",
        wattage: "750W",
        efficiency: "80+ Gold",
        recommended: false
      }
    ],
    "1200-2000": [
      {
        name: "Corsair RM850x",
        value: "corsair-rm850x",
        description: "Premium fully modular PSU with excellent build quality",
        price: "~$140",
        brand: "Corsair",
        wattage: "850W",
        efficiency: "80+ Gold",
        recommended: true
      },
      {
        name: "Seasonic Focus GX-850",
        value: "seasonic-focus-gx-850",
        description: "Top-tier PSU with hybrid fan control",
        price: "~$150",
        brand: "Seasonic",
        wattage: "850W",
        efficiency: "80+ Gold",
        recommended: true
      },
      {
        name: "EVGA SuperNOVA 1000W Gold",
        value: "evga-supernova-1000w",
        description: "High-wattage option for power-hungry systems",
        price: "~$180",
        brand: "EVGA",
        wattage: "1000W",
        efficiency: "80+ Gold",
        recommended: false
      }
    ],
    "2000+": [
      {
        name: "Corsair RM1200e",
        value: "corsair-rm1200e",
        description: "Ultra-high wattage for flagship systems",
        price: "~$220",
        brand: "Corsair",
        wattage: "1200W",
        efficiency: "80+ Gold",
        recommended: true
      },
      {
        name: "Seasonic Prime TX-1200",
        value: "seasonic-prime-tx-1200",
        description: "Titanium efficiency flagship power supply",
        price: "~$330",
        brand: "Seasonic",
        wattage: "1200W",
        efficiency: "80+ Titanium",
        recommended: false
      },
      {
        name: "ASUS Thor 1200W Platinum II",
        value: "asus-thor-1200w",
        description: "Premium PSU with OLED display and RGB lighting",
        price: "~$350",
        brand: "ASUS",
        wattage: "1200W",
        efficiency: "80+ Platinum",
        recommended: true
      }
    ]
  };

  // Case Data
  const caseData = {
    "500-800": [
      {
        name: "NZXT H510",
        value: "nzxt-h510",
        description: "Clean minimalist design with excellent build quality",
        price: "~$70",
        brand: "NZXT",
        formFactor: "Mid Tower",
        recommended: true
      },
      {
        name: "Phanteks Eclipse P300A",
        value: "phanteks-p300a",
        description: "Great airflow design with mesh front panel",
        price: "~$60",
        brand: "Phanteks",
        formFactor: "Mid Tower",
        recommended: true
      },
      {
        name: "Cooler Master MasterBox Q300L",
        value: "coolermaster-q300l",
        description: "Compact micro-ATX case for smaller builds",
        price: "~$55",
        brand: "Cooler Master",
        formFactor: "Micro ATX",
        recommended: false
      }
    ],
    "800-1200": [
      {
        name: "NZXT H510 Flow",
        value: "nzxt-h510-flow",
        description: "Improved airflow version of the popular H510",
        price: "~$80",
        brand: "NZXT",
        formFactor: "Mid Tower",
        recommended: true
      },
      {
        name: "Fractal Design Meshify 2 Compact",
        value: "fractal-meshify-2-compact",
        description: "Premium build quality with excellent cooling performance",
        price: "~$110",
        brand: "Fractal Design",
        formFactor: "Mid Tower",
        recommended: false
      },
      {
        name: "Lian Li Lancool 215",
        value: "lianli-lancool-215",
        description: "Great value case with pre-installed fans",
        price: "~$100",
        brand: "Lian Li",
        formFactor: "Mid Tower",
        recommended: true
      }
    ],
    "1200-2000": [
      {
        name: "Phanteks Eclipse P500A",
        value: "phanteks-p500a",
        description: "High-airflow design with premium features",
        price: "~$130",
        brand: "Phanteks",
        formFactor: "Mid Tower",
        recommended: true
      },
      {
        name: "Lian Li Lancool II Mesh RGB",
        value: "lianli-lancool-ii-mesh",
        description: "RGB lighting with excellent cooling performance",
        price: "~$120",
        brand: "Lian Li",
        formFactor: "Mid Tower",
        recommended: true
      },
      {
        name: "NZXT H7 Flow",
        value: "nzxt-h7-flow",
        description: "Latest generation NZXT case with improved design",
        price: "~$130",
        brand: "NZXT",
        formFactor: "Mid Tower",
        recommended: false
      }
    ],
    "2000+": [
      {
        name: "Lian Li O11 Dynamic XL",
        value: "lianli-o11-dynamic-xl",
        description: "Premium enthusiast case with dual-chamber design",
        price: "~$200",
        brand: "Lian Li",
        formFactor: "Full Tower",
        recommended: true
      },
      {
        name: "Fractal Design Torrent",
        value: "fractal-torrent",
        description: "Maximum airflow design for high-end components",
        price: "~$220",
        brand: "Fractal Design",
        formFactor: "Full Tower",
        recommended: true
      },
      {
        name: "Corsair 7000D Airflow",
        value: "corsair-7000d-airflow",
        description: "Flagship full tower with exceptional space and cooling",
        price: "~$250",
        brand: "Corsair",
        formFactor: "Full Tower",
        recommended: false
      }
    ]
  };

  // Cooler Data
  const coolerData = {
    "500-800": [
      {
        name: "Stock CPU Cooler",
        value: "stock-cooler",
        description: "Included cooler with CPU purchase - adequate for basic use",
        price: "Included",
        brand: "Various",
        type: "Stock",
        recommended: true
      }
    ],
    "800-1200": [
      {
        name: "Stock CPU Cooler",
        value: "stock-cooler-mid",
        description: "Included cooler with CPU purchase",
        price: "Included",
        brand: "Various",
        type: "Stock",
        recommended: true
      }
    ],
    "1200-2000": [
      {
        name: "be quiet! Dark Rock Pro 5",
        value: "bequiet-dark-rock-pro-5",
        description: "Premium air cooler with excellent performance and low noise",
        price: "~$95",
        brand: "be quiet!",
        type: "Air Cooler",
        recommended: true
      },
      {
        name: "Noctua NH-D15",
        value: "noctua-nh-d15",
        description: "Flagship air cooler with dual-tower design",
        price: "~$100",
        brand: "Noctua",
        type: "Air Cooler",
        recommended: true
      },
      {
        name: "Arctic Liquid Freezer II 240mm AIO",
        value: "arctic-liquid-freezer-240",
        description: "High-performance AIO liquid cooler with great value",
        price: "~$120–$150",
        brand: "Arctic",
        type: "AIO Liquid",
        recommended: false
      }
    ],
    "2000+": [
      {
        name: "Noctua NH-D15 chromax.black",
        value: "noctua-nh-d15-chromax",
        description: "Premium air cooling with black aesthetic",
        price: "~$110",
        brand: "Noctua",
        type: "Air Cooler",
        recommended: true
      },
      {
        name: "Arctic Liquid Freezer II 360 AIO",
        value: "arctic-liquid-freezer-360",
        description: "Maximum cooling performance for flagship CPUs",
        price: "~$160",
        brand: "Arctic",
        type: "AIO Liquid",
        recommended: true
      },
      {
        name: "NZXT Kraken Z73 360mm AIO",
        value: "nzxt-kraken-z73",
        description: "Premium AIO with LCD display and RGB lighting",
        price: "~$250",
        brand: "NZXT",
        type: "AIO Liquid",
        recommended: false
      }
    ]
  };

  const handleBudgetSelection = (value: string) => {
    setBudget(value);
    setBudgetLocked(true);
    setCurrentScreen("components");
  };

  const handleResetBuild = () => {
    setBudget("");
    setBudgetLocked(false);
    setSelectedComponent("");
    setSelectedCPU(null);
    setSelectedGPU(null);
    setSelectedMotherboard(null);
    setSelectedRAM(null);
    setSelectedStorage(null);
    setSelectedPSU(null);
    setSelectedCase(null);
    setSelectedCooler(null);
    setCurrentScreen("welcome");
  };

  const allComponentsSelected = () => {
    return selectedCPU && selectedGPU && selectedMotherboard && selectedRAM && 
           selectedStorage && selectedPSU && selectedCase && selectedCooler;
  };

  const getComponentsCompletionStatus = () => {
    const components = [
      { name: "CPU", selected: !!selectedCPU },
      { name: "GPU", selected: !!selectedGPU },
      { name: "Motherboard", selected: !!selectedMotherboard },
      { name: "RAM", selected: !!selectedRAM },
      { name: "Storage", selected: !!selectedStorage },
      { name: "PSU", selected: !!selectedPSU },
      { name: "Case", selected: !!selectedCase },
      { name: "CPU Cooler", selected: !!selectedCooler }
    ];
    const selectedCount = components.filter(c => c.selected).length;
    return { components, selectedCount, total: components.length };
  };

  const parsePrice = (priceStr: string): number => {
    if (priceStr.toLowerCase().includes("included")) return 0;
    const match = priceStr.match(/\$?(\d+)/);
    return match ? parseInt(match[1]) : 0;
  };

  const calculateTotalPrice = () => {
    let total = 0;
    if (selectedCPU) total += parsePrice(selectedCPU.price);
    if (selectedGPU) total += parsePrice(selectedGPU.price);
    if (selectedMotherboard) total += parsePrice(selectedMotherboard.price);
    if (selectedRAM) total += parsePrice(selectedRAM.price);
    if (selectedStorage) total += parsePrice(selectedStorage.price);
    if (selectedPSU) total += parsePrice(selectedPSU.price);
    if (selectedCase) total += parsePrice(selectedCase.price);
    if (selectedCooler) total += parsePrice(selectedCooler.price);
    return total;
  };

  const saveBuildToFile = () => {
    const build = {
      budget: budget,
      components: {
        cpu: selectedCPU,
        gpu: selectedGPU,
        motherboard: selectedMotherboard,
        ram: selectedRAM,
        storage: selectedStorage,
        psu: selectedPSU,
        case: selectedCase,
        cooler: selectedCooler
      },
      totalPrice: calculateTotalPrice(),
      dateCreated: new Date().toISOString()
    };

    const dataStr = JSON.stringify(build, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `pc-build-${budget}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleComponentSelection = (component: string) => {
    setSelectedComponent(component);
    if (component === "cpu") {
      setCurrentScreen("cpu");
    } else if (component === "gpu") {
      setCurrentScreen("gpu");
    } else if (component === "motherboard") {
      setCurrentScreen("motherboard");
    } else if (component === "ram") {
      setCurrentScreen("ram");
    } else if (component === "storage") {
      setCurrentScreen("storage");
    } else if (component === "psu") {
      setCurrentScreen("psu");
    } else if (component === "case") {
      setCurrentScreen("case");
    } else if (component === "cooler") {
      setCurrentScreen("cooler");
    }
  };

  // Generic component selection renderer
  const renderComponentScreen = (
    componentType: string,
    componentData: any,
    selectedValue: any,
    setSelectedValue: (value: any) => void,
    icon: any,
    title: string,
    description: string,
    colorTheme: string,
    nextScreen: string
  ) => {
    const availableComponents = componentData[budget as keyof typeof componentData] || [];
    
    const colorClasses = {
      blue: {
        bg: "from-blue-50 via-white to-purple-50",
        blur: "bg-blue-500",
        border: "border-blue-100",
        ring: "ring-blue-400",
        accent: "bg-blue-50/70",
        iconBg: "bg-blue-100",
        iconColor: "text-blue-600",
        gradientText: "from-blue-900 via-purple-900 to-blue-900",
        button: "from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
      },
      purple: {
        bg: "from-purple-50 via-white to-blue-50",
        blur: "bg-purple-500",
        border: "border-purple-100",
        ring: "ring-purple-400",
        accent: "bg-purple-50/70",
        iconBg: "bg-purple-100",
        iconColor: "text-purple-600",
        gradientText: "from-purple-900 via-blue-900 to-purple-900",
        button: "from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
      },
      green: {
        bg: "from-green-50 via-white to-blue-50",
        blur: "bg-green-500",
        border: "border-green-100",
        ring: "ring-green-400",
        accent: "bg-green-50/70",
        iconBg: "bg-green-100",
        iconColor: "text-green-600",
        gradientText: "from-green-900 via-blue-900 to-green-900",
        button: "from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
      },
      orange: {
        bg: "from-orange-50 via-white to-yellow-50",
        blur: "bg-orange-500",
        border: "border-orange-100",
        ring: "ring-orange-400",
        accent: "bg-orange-50/70",
        iconBg: "bg-orange-100",
        iconColor: "text-orange-600",
        gradientText: "from-orange-900 via-yellow-900 to-orange-900",
        button: "from-orange-600 to-yellow-600 hover:from-orange-700 hover:to-yellow-700"
      },
      cyan: {
        bg: "from-cyan-50 via-white to-blue-50",
        blur: "bg-cyan-500",
        border: "border-cyan-100",
        ring: "ring-cyan-400",
        accent: "bg-cyan-50/70",
        iconBg: "bg-cyan-100",
        iconColor: "text-cyan-600",
        gradientText: "from-cyan-900 via-blue-900 to-cyan-900",
        button: "from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700"
      },
      red: {
        bg: "from-red-50 via-white to-pink-50",
        blur: "bg-red-500",
        border: "border-red-100",
        ring: "ring-red-400",
        accent: "bg-red-50/70",
        iconBg: "bg-red-100",
        iconColor: "text-red-600",
        gradientText: "from-red-900 via-pink-900 to-red-900",
        button: "from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700"
      },
      gray: {
        bg: "from-gray-50 via-white to-slate-50",
        blur: "bg-gray-500",
        border: "border-gray-100",
        ring: "ring-gray-400",
        accent: "bg-gray-50/70",
        iconBg: "bg-gray-100",
        iconColor: "text-gray-600",
        gradientText: "from-gray-900 via-slate-900 to-gray-900",
        button: "from-gray-600 to-slate-600 hover:from-gray-700 hover:to-slate-700"
      },
      teal: {
        bg: "from-teal-50 via-white to-cyan-50",
        blur: "bg-teal-500",
        border: "border-teal-100",
        ring: "ring-teal-400",
        accent: "bg-teal-50/70",
        iconBg: "bg-teal-100",
        iconColor: "text-teal-600",
        gradientText: "from-teal-900 via-cyan-900 to-teal-900",
        button: "from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700"
      }
    };

    const colors = colorClasses[colorTheme as keyof typeof colorClasses] || colorClasses.blue;
    
    return (
      <div className="min-h-screen relative overflow-hidden">
        {/* Gradient Background */}
        <div className={`absolute inset-0 bg-gradient-to-br ${colors.bg}`} />
        
        {/* Hero Background Image */}
        <div className="absolute inset-0 opacity-5">
          <ImageWithFallback 
            src="https://images.unsplash.com/photo-1677019758488-ca44c974ef62?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21wb25lbnRzfGVufDF8fHx8MTc1NTI5NzY3MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="PC Components"
            className="w-full h-full object-cover"
          />
        </div>

        {/* AI Chat Button - Fixed Position */}
        <motion.div
          className="fixed bottom-6 right-6 z-20"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1.5, type: "spring", stiffness: 260, damping: 20 }}
        >
          <Button
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 rounded-full px-6 py-3"
            onClick={() => setIsChatOpen(true)}
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            Ask AI Assistant
          </Button>
        </motion.div>

        {/* Main Content */}
        <div className="relative z-10 min-h-screen flex flex-col items-center justify-between p-8">
          {/* Header Section */}
          <motion.div 
            className="flex-1 flex flex-col items-center justify-center text-center max-w-5xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Icon and Badge */}
            <motion.div 
              className="mb-8 flex flex-col items-center gap-4"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="relative">
                <div className={`absolute inset-0 ${colors.blur} rounded-full blur-xl opacity-30 animate-pulse`} />
                <div className={`relative bg-white rounded-full p-6 shadow-lg border ${colors.border}`}>
                  {React.createElement(icon, { className: `w-12 h-12 ${colors.iconColor}` })}
                </div>
              </div>
              <Badge variant="secondary" className="px-4 py-2 text-sm">
                {React.createElement(icon, { className: `w-4 h-4 mr-2` })}
                Step 3 of 3 - {title} Selection
              </Badge>
            </motion.div>

            {/* Main Heading */}
            <motion.h1 
              className={`mb-6 bg-gradient-to-r ${colors.gradientText} bg-clip-text text-transparent`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Choose your {title}
            </motion.h1>

            {/* Subtitle */}
            <motion.p 
              className="text-lg text-gray-600 mb-8 max-w-2xl leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Based on your ${budget.replace('-', ' - $')} budget, here are the best {title.toLowerCase()} options {description}.
            </motion.p>

            {/* Component Selection Grid */}
            <motion.div 
              className="w-full max-w-4xl space-y-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              {availableComponents.map((component: any, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.9 + index * 0.1 }}
                >
                  <Card 
                    className={`p-6 bg-white/70 backdrop-blur-sm ${colors.border} hover:shadow-lg transition-all duration-300 hover:scale-[1.02] cursor-pointer ${
                      selectedValue?.value === component.value ? `ring-2 ${colors.ring} ${colors.accent}` : ''
                    }`}
                    onClick={() => setSelectedValue(component)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-start gap-4 flex-1">
                        <div className={`${colors.iconBg} rounded-lg p-3 flex-shrink-0`}>
                          {React.createElement(icon, { className: `w-6 h-6 ${colors.iconColor}` })}
                        </div>
                        <div className="flex flex-col items-start flex-1">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <span className="font-medium text-gray-900">{component.name}</span>
                            {component.recommended && (
                              <Badge variant="secondary" className="text-xs bg-green-100 text-green-700">
                                Recommended
                              </Badge>
                            )}
                            <Badge variant="outline" className={`text-xs ${
                              component.brand === 'AMD' ? 'border-red-200 text-red-700' :
                              component.brand === 'Intel' ? 'border-blue-200 text-blue-700' :
                              component.brand === 'NVIDIA' ? 'border-green-200 text-green-700' :
                              'border-gray-200 text-gray-700'
                            }`}>
                              {component.brand}
                            </Badge>
                            {component.socket && (
                              <Badge variant="outline" className="text-xs border-indigo-200 text-indigo-700">
                                {component.socket}
                              </Badge>
                            )}
                            {component.type && (
                              <Badge variant="outline" className="text-xs border-violet-200 text-violet-700">
                                {component.type}
                              </Badge>
                            )}
                            {component.capacity && (
                              <Badge variant="outline" className="text-xs border-pink-200 text-pink-700">
                                {component.capacity}
                              </Badge>
                            )}
                            {component.wattage && (
                              <Badge variant="outline" className="text-xs border-yellow-200 text-yellow-700">
                                {component.wattage}
                              </Badge>
                            )}
                            {component.formFactor && (
                              <Badge variant="outline" className="text-xs border-emerald-200 text-emerald-700">
                                {component.formFactor}
                              </Badge>
                            )}
                          </div>
                          <span className="text-sm text-gray-500 mb-2">{component.description}</span>
                          <span className="text-sm font-medium text-green-600">{component.price}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        {selectedValue?.value === component.value && (
                          <CheckCircle className={`w-5 h-5 ${colors.iconColor}`} />
                        )}
                        <ArrowRight className="w-4 h-4 text-gray-400" />
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
          
          {/* Bottom Navigation Section */}
          <motion.div 
            className="pb-8 flex gap-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
          >
            <Button 
              variant="outline"
              size="lg" 
              className={`px-6 py-4 text-lg bg-white/70 backdrop-blur-sm ${colors.border} hover:bg-white/90`}
              onClick={() => setCurrentScreen("components")}
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Components
            </Button>
            <Button 
              size="lg" 
              className={`px-8 py-4 text-lg bg-gradient-to-r ${colors.button} shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105`}
              onClick={() => {
                if (nextScreen === "summary") {
                  if (allComponentsSelected()) {
                    setCurrentScreen("summary");
                  } else {
                    alert("Please select all components before continuing to summary.");
                  }
                } else {
                  setCurrentScreen(nextScreen as any);
                }
              }}
              disabled={!selectedValue}
            >
              {nextScreen === "summary" ? "View Summary" : "Continue"}
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </motion.div>
        </div>

        {/* AI Chat Component */}
        <AIRecommendationChat
          budget={budget}
          currentComponent={componentType.toLowerCase()}
          isOpen={isChatOpen}
          onClose={() => setIsChatOpen(false)}
          onRecommendationReceived={(recommendation) => {
            console.log("AI Recommendation received:", recommendation);
          }}
        />
      </div>
    );
  };

  // Main render based on current screen
  if (currentScreen === "welcome") {
    return (
      <div className="min-h-screen relative overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50" />
        
        {/* Hero Background Image */}
        <div className="absolute inset-0 opacity-10">
          <ImageWithFallback 
            src="https://images.unsplash.com/photo-1540829917886-91ab031b1764?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21wb25lbnRzfGVufDF8fHx8MTc1NTI5NzY3MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="PC Building"
            className="w-full h-full object-cover"
          />
        </div>

        {/* AI Chat Button - Fixed Position */}
        <motion.div
          className="fixed bottom-6 right-6 z-20"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1.5, type: "spring", stiffness: 260, damping: 20 }}
        >
          <Button
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 rounded-full px-6 py-3"
            onClick={() => setIsChatOpen(true)}
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            Ask AI Assistant
          </Button>
        </motion.div>

        {/* Main Content */}
        <div className="relative z-10 min-h-screen flex flex-col items-center justify-between p-8">
          {/* Header Section */}
          <motion.div 
            className="flex-1 flex flex-col items-center justify-center text-center max-w-4xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Logo/Icon */}
            <motion.div 
              className="mb-8 flex flex-col items-center gap-4"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-blue-500 rounded-full blur-xl opacity-30 animate-pulse" />
                <div className="relative bg-white rounded-full p-8 shadow-lg border border-blue-100">
                  <Monitor className="w-16 h-16 text-blue-600" />
                </div>
              </div>
              <Badge variant="secondary" className="px-4 py-2 text-sm">
                <Sparkles className="w-4 h-4 mr-2" />
                AI-Powered PC Builder
              </Badge>
            </motion.div>

            {/* Main Heading */}
            <motion.h1 
              className="mb-6 bg-gradient-to-r from-blue-900 via-purple-900 to-blue-900 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Build Your Perfect PC
            </motion.h1>

            {/* Subtitle */}
            <motion.p 
              className="text-lg text-gray-600 mb-12 max-w-2xl leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Get personalized component recommendations based on your budget and needs. Our AI-powered system ensures perfect compatibility and optimal performance.
            </motion.p>

            {/* Features */}
            <motion.div 
              className="flex flex-wrap justify-center gap-6 mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-3 px-4 py-3 bg-white/60 backdrop-blur-sm rounded-xl border border-blue-100"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 1.0 + index * 0.1 }}
                >
                  <div className="bg-blue-100 rounded-lg p-2">
                    <feature.icon className="w-5 h-5 text-blue-600" />
                  </div>
                  <span className="font-medium text-gray-700">{feature.text}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
          
          {/* Bottom CTA Section */}
          <motion.div 
            className="pb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
          >
            <Button 
              size="lg" 
              className="px-12 py-6 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              onClick={() => setCurrentScreen("budget")}
            >
              Start Building
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </motion.div>
        </div>

        {/* AI Chat Component */}
        <AIRecommendationChat
          budget={budget || "800-1200"}
          currentComponent="welcome"
          isOpen={isChatOpen}
          onClose={() => setIsChatOpen(false)}
          onRecommendationReceived={(recommendation) => {
            console.log("AI Recommendation received:", recommendation);
          }}
        />
      </div>
    );
  }

  if (currentScreen === "budget") {
    return (
      <div className="min-h-screen relative overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-white to-blue-50" />
        
        {/* Hero Background Image */}
        <div className="absolute inset-0 opacity-5">
          <ImageWithFallback 
            src="https://images.unsplash.com/photo-1511512578047-dfb367046420?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidWRnZXR8ZW58MXx8fHwxNzU1Mjk3NjcxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Budget Planning"
            className="w-full h-full object-cover"
          />
        </div>

        {/* AI Chat Button - Fixed Position */}
        <motion.div
          className="fixed bottom-6 right-6 z-20"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1.5, type: "spring", stiffness: 260, damping: 20 }}
        >
          <Button
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 rounded-full px-6 py-3"
            onClick={() => setIsChatOpen(true)}
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            Ask AI Assistant
          </Button>
        </motion.div>

        {/* Main Content */}
        <div className="relative z-10 min-h-screen flex flex-col items-center justify-between p-8">
          {/* Header Section */}
          <motion.div 
            className="flex-1 flex flex-col items-center justify-center text-center max-w-4xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Icon and Badge */}
            <motion.div 
              className="mb-8 flex flex-col items-center gap-4"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-green-500 rounded-full blur-xl opacity-30 animate-pulse" />
                <div className="relative bg-white rounded-full p-6 shadow-lg border border-green-100">
                  <DollarSign className="w-12 h-12 text-green-600" />
                </div>
              </div>
              <Badge variant="secondary" className="px-4 py-2 text-sm">
                <DollarSign className="w-4 h-4 mr-2" />
                Step 1 of 3 - Budget Selection
              </Badge>
            </motion.div>

            {/* Main Heading */}
            <motion.h1 
              className="mb-6 bg-gradient-to-r from-green-900 via-blue-900 to-green-900 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              What's your budget?
            </motion.h1>

            {/* Subtitle */}
            <motion.p 
              className="text-lg text-gray-600 mb-12 max-w-2xl leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Choose your budget range to get personalized component recommendations that deliver the best performance for your money.
            </motion.p>

            {/* Budget Selection Grid */}
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              {budgetRanges.map((range, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.0 + index * 0.1 }}
                >
                  <Card 
                    className={`p-6 bg-white/70 backdrop-blur-sm border-green-100 hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer ${
                      budget === range.value ? 'ring-2 ring-green-400 bg-green-50/70' : ''
                    }`}
                    onClick={() => handleBudgetSelection(range.value)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="bg-green-100 rounded-lg p-3">
                          <DollarSign className="w-6 h-6 text-green-600" />
                        </div>
                        <div>
                          <span className="font-medium text-gray-900">{range.label}</span>
                          <span className="block text-sm text-gray-500">{range.description}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {budget === range.value && (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        )}
                        <ArrowRight className="w-4 h-4 text-gray-400" />
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
          
          {/* Bottom Navigation Section */}
          <motion.div 
            className="pb-8 flex gap-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.6 }}
          >
            <Button 
              variant="outline"
              size="lg" 
              className="px-6 py-4 text-lg bg-white/70 backdrop-blur-sm border-green-100 hover:bg-white/90"
              onClick={() => setCurrentScreen("welcome")}
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back
            </Button>
            <Button 
              size="lg" 
              className="px-8 py-4 text-lg bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              onClick={() => setCurrentScreen("components")}
              disabled={!budget}
            >
              Continue
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </motion.div>
        </div>

        {/* AI Chat Component */}
        <AIRecommendationChat
          budget={budget || "800-1200"}
          currentComponent="budget"
          isOpen={isChatOpen}
          onClose={() => setIsChatOpen(false)}
          onRecommendationReceived={(recommendation) => {
            console.log("AI Recommendation received:", recommendation);
          }}
        />
      </div>
    );
  }

  if (currentScreen === "components") {
    return (
      <div className="min-h-screen relative overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-white to-blue-50" />
        
        {/* Hero Background Image */}
        <div className="absolute inset-0 opacity-5">
          <ImageWithFallback 
            src="https://images.unsplash.com/photo-1677019758488-ca44c974ef62?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21wb25lbnRzfGVufDF8fHx8MTc1NTI5NzY3MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="PC Components"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Main Content */}
        <div className="relative z-10 min-h-screen flex flex-col items-center justify-between p-8">
          {/* Header Section */}
          <motion.div 
            className="flex-1 flex flex-col items-center justify-center text-center max-w-5xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Icon and Badge */}
            <motion.div 
              className="mb-8 flex flex-col items-center gap-4"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-purple-500 rounded-full blur-xl opacity-30 animate-pulse" />
                <div className="relative bg-white rounded-full p-6 shadow-lg border border-purple-100">
                  <Cpu className="w-12 h-12 text-purple-600" />
                </div>
              </div>
              <Badge variant="secondary" className="px-4 py-2 text-sm">
                <Cpu className="w-4 h-4 mr-2" />
                Step 2 of 3 - Component Selection
              </Badge>
            </motion.div>

            {/* Main Heading */}
            <motion.h1 
              className="mb-6 bg-gradient-to-r from-purple-900 via-blue-900 to-purple-900 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Choose your components
            </motion.h1>

            {/* Subtitle */}
            <motion.p 
              className="text-lg text-gray-600 mb-8 max-w-2xl leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Based on your ${budget.replace('-', ' - $')} budget, select each component to build your perfect PC. We'll guide you through every choice.
            </motion.p>

            {/* Component Selection Grid */}
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              {pcComponents.map((component, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.0 + index * 0.1 }}
                >
                  <Card 
                    className="p-6 bg-white/70 backdrop-blur-sm border-purple-100 hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer"
                    onClick={() => handleComponentSelection(component.value)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`bg-${component.color}-100 rounded-lg p-3`}>
                          <component.icon className={`w-6 h-6 text-${component.color}-600`} />
                        </div>
                        <div>
                          <span className="font-medium text-gray-900 block">{component.name}</span>
                          <span className="text-sm text-gray-500">{component.description}</span>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-gray-400" />
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
          
          {/* Bottom Navigation Section */}
          <motion.div 
            className="pb-8 flex gap-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.8 }}
          >
            <Button 
              variant="outline"
              size="lg" 
              className="px-6 py-4 text-lg bg-white/70 backdrop-blur-sm border-purple-100 hover:bg-white/90"
              onClick={() => setCurrentScreen("budget")}
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Budget
            </Button>
          </motion.div>
        </div>
      </div>
    );
  }

  // Component-specific screens
  if (currentScreen === "cpu") {
    return renderComponentScreen("CPU", cpuData, selectedCPU, setSelectedCPU, Cpu, "CPU", "for processing power", "blue", "gpu");
  }

  if (currentScreen === "gpu") {
    return renderComponentScreen("GPU", gpuData, selectedGPU, setSelectedGPU, Monitor, "Graphics Card", "for gaming and visuals", "purple", "motherboard");
  }

  if (currentScreen === "motherboard") {
    return renderComponentScreen("Motherboard", motherboardData, selectedMotherboard, setSelectedMotherboard, CircuitBoard, "Motherboard", "to connect everything", "green", "ram");
  }

  if (currentScreen === "ram") {
    return renderComponentScreen("RAM", ramData, selectedRAM, setSelectedRAM, MemoryStick, "Memory (RAM)", "for multitasking", "orange", "storage");
  }

  if (currentScreen === "storage") {
    return renderComponentScreen("Storage", storageData, selectedStorage, setSelectedStorage, HardDrive, "Storage", "for your files and programs", "cyan", "psu");
  }

  if (currentScreen === "psu") {
    return renderComponentScreen("PSU", psuData, selectedPSU, setSelectedPSU, Plug, "Power Supply", "to power your system", "red", "case");
  }

  if (currentScreen === "case") {
    return renderComponentScreen("Case", caseData, selectedCase, setSelectedCase, Box, "PC Case", "to house your build", "gray", "cooler");
  }

  if (currentScreen === "cooler") {
    return renderComponentScreen("Cooler", coolerData, selectedCooler, setSelectedCooler, Wind, "CPU Cooler", "to keep temperatures low", "teal", "summary");
  }

  // Summary Screen
  if (currentScreen === "summary") {
    const totalPrice = calculateTotalPrice();
    const selectedComponents = [
      { name: "CPU", data: selectedCPU, icon: Cpu, color: "blue" },
      { name: "GPU", data: selectedGPU, icon: Monitor, color: "purple" },
      { name: "Motherboard", data: selectedMotherboard, icon: CircuitBoard, color: "green" },
      { name: "RAM", data: selectedRAM, icon: MemoryStick, color: "orange" },
      { name: "Storage", data: selectedStorage, icon: HardDrive, color: "cyan" },
      { name: "PSU", data: selectedPSU, icon: Plug, color: "red" },
      { name: "Case", data: selectedCase, icon: Box, color: "gray" },
      { name: "CPU Cooler", data: selectedCooler, icon: Wind, color: "teal" }
    ];

    return (
      <div className="min-h-screen relative overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-white to-blue-50" />
        
        {/* Hero Background Image */}
        <div className="absolute inset-0 opacity-5">
          <ImageWithFallback 
            src="https://images.unsplash.com/photo-1593642632823-8f785ba67e45?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21wdXRlciUyMGJ1aWxkfGVufDF8fHx8MTc1NTI5NzY3MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="PC Build Complete"
            className="w-full h-full object-cover"
          />
        </div>

        {/* AI Chat Button - Fixed Position */}
        <motion.div
          className="fixed bottom-6 right-6 z-20"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, type: "spring", stiffness: 260, damping: 20 }}
        >
          <Button
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 rounded-full px-6 py-3"
            onClick={() => setIsChatOpen(true)}
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            Ask AI Assistant
          </Button>
        </motion.div>

        {/* Main Content */}
        <div className="relative z-10 min-h-screen flex flex-col items-center p-8">
          {/* Header Section */}
          <motion.div 
            className="w-full max-w-6xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Icon and Badge */}
            <motion.div 
              className="mb-8 flex flex-col items-center gap-4"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-green-500 rounded-full blur-xl opacity-30 animate-pulse" />
                <div className="relative bg-white rounded-full p-6 shadow-lg border border-green-100">
                  <CheckCircle className="w-12 h-12 text-green-600" />
                </div>
              </div>
              <Badge variant="secondary" className="px-4 py-2 text-sm bg-green-100 text-green-700">
                <CheckCircle className="w-4 h-4 mr-2" />
                Build Complete!
              </Badge>
            </motion.div>

            {/* Main Heading */}
            <motion.h1 
              className="mb-4 bg-gradient-to-r from-purple-900 via-blue-900 to-purple-900 bg-clip-text text-transparent text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Your Custom PC Build
            </motion.h1>

            {/* Subtitle */}
            <motion.p 
              className="text-lg text-gray-600 mb-8 text-center max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Budget: ${budget.replace('-', ' - $')} | Total Estimated Cost: <span className="font-semibold text-purple-600">${totalPrice.toLocaleString()}</span>
            </motion.p>

            {/* Components List */}
            <motion.div 
              className="space-y-4 mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              {selectedComponents.map((component, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.9 + index * 0.1 }}
                >
                  <Card className="p-6 bg-white/70 backdrop-blur-sm border-purple-100 hover:shadow-lg transition-all duration-300">
                    <div className="flex items-center justify-between">
                      <div className="flex items-start gap-4 flex-1">
                        <div className={`bg-${component.color}-100 rounded-lg p-3 flex-shrink-0`}>
                          {React.createElement(component.icon, { className: `w-6 h-6 text-${component.color}-600` })}
                        </div>
                        <div className="flex flex-col items-start flex-1">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <span className="text-sm text-gray-500">{component.name}</span>
                            {component.data?.recommended && (
                              <Badge variant="secondary" className="text-xs bg-green-100 text-green-700">
                                Recommended
                              </Badge>
                            )}
                          </div>
                          <span className="font-medium text-gray-900">{component.data?.name || "Not Selected"}</span>
                          <span className="text-sm text-gray-500">{component.data?.description}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-lg font-semibold text-green-600">{component.data?.price || "$0"}</span>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>

            {/* Total Price Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.8 }}
            >
              <Card className="p-8 bg-gradient-to-r from-purple-50 to-blue-50 border-2 border-purple-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-semibold text-gray-900 mb-1">Total Estimated Cost</h3>
                    <p className="text-sm text-gray-600">Prices are approximate and may vary</p>
                  </div>
                  <div className="text-right">
                    <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                      ${totalPrice.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      Budget: ${budget.replace('-', ' - $')}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Action Buttons */}
            <motion.div 
              className="mt-8 flex gap-4 justify-center flex-wrap"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 2 }}
            >
              <Button 
                variant="outline"
                size="lg" 
                className="px-6 py-4 text-lg bg-white/70 backdrop-blur-sm border-purple-200 hover:bg-white/90"
                onClick={saveBuildToFile}
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Save Build
              </Button>
              <Button 
                size="lg" 
                className="px-8 py-4 text-lg bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                onClick={handleResetBuild}
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Start New Build
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* AI Chat Component */}
        <AIRecommendationChat
          budget={budget}
          currentComponent="summary"
          isOpen={isChatOpen}
          onClose={() => setIsChatOpen(false)}
          onRecommendationReceived={(recommendation) => {
            console.log("AI Recommendation received:", recommendation);
          }}
        />
      </div>
    );
  }

  // Fallback return (should never reach here)
  return null;
}