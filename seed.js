const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Startup = require('./models/Startup');

dotenv.config();

const startups = [
  // Existing from sampleData.ts
  { name: "Skyroot Aerospace", founder: "Pawan Kumar Chandana, Naga Bharath Daka", description: "India's first private space launch provider.", website: "https://www.skyroot.in/", category: "AI & Deep Tech", location: "Hyderabad" },
  { name: "Dhruva Space", founder: "Sanjay Nekkanti", description: "Full-stack space engineering solutions.", website: "https://www.dhruvaspace.com/", category: "AI & Deep Tech", location: "Hyderabad" },
  { name: "Darwinbox", founder: "Chaitanya Peddi, Jayant Paleti, Rohit Chennamaneni", description: "Enterprise HRTech platform. Unicorn status.", website: "https://darwinbox.com/", category: "SaaS", location: "Hyderabad" },
  { name: "Keka HR", founder: "Vijay Yalamanchili", description: "HR software for SMEs.", website: "https://www.keka.com/", category: "SaaS", location: "Hyderabad" },
  { name: "HighRadius", founder: "Sashi Narahari", description: "Finance automation platform.", website: "https://www.highradius.com/", category: "SaaS", location: "Hyderabad" },
  { name: "NxtWave", founder: "Rahul Attuluri", description: "IT & coding skills education platform.", website: "https://www.ccbp.in/", category: "Others", location: "Hyderabad" },
  { name: "Bhanzu", founder: "Neelakantha Bhanu Prakash", description: "Math learning platform.", website: "https://bhanzu.com/", category: "Others", location: "Hyderabad" },
  { name: "MedPlus", founder: "Madhukar Gangadi", description: "Pharmacy chain and health services.", website: "https://www.medplusindia.com/", category: "Healthtech", location: "Hyderabad" },
  { name: "eKincare", founder: "Kiran Kalakuntla", description: "Corporate wellness & health platform.", website: "https://www.ekincare.com/", category: "Healthtech", location: "Hyderabad" },
  { name: "Recykal", founder: "Abhay Deshpande", description: "Waste management & recycling technology.", website: "https://www.recykal.com/", category: "Others", location: "Hyderabad" },
  { name: "Freyr Energy", founder: "Saurabh Marda", description: "Solar energy solutions.", website: "https://freyrenergy.com/", category: "Others", location: "Hyderabad" },
  { name: "UrbanKisaan", founder: "Vihari Kanukollu", description: "Hydroponics & modern farming technology.", website: "https://www.urbankisaan.com/", category: "Others", location: "Hyderabad" },
  { name: "Kheyti", founder: "Kaushik Kappagantulu", description: "Greenhouse technology for small farmers.", website: "https://www.kheyti.com/", category: "Others", location: "Hyderabad" },
  { name: "KFin Technologies", founder: "Venkata Satya M", description: "Financial services platform.", website: "https://www.kfintech.com/", category: "Fintech", location: "Hyderabad" },
  { name: "Zaggle", founder: "Raj N Phani", description: "Prepaid & spend management.", website: "https://www.zaggle.in/", category: "Fintech", location: "Hyderabad" },
  { name: "Landeed", founder: "Sanjay Mandava", description: "Land & property records platform (YC-backed).", website: "https://www.landeed.com/", category: "Others", location: "Hyderabad" },
  { name: "Zenoti", founder: "Sudheer Koneru", description: "Global cloud platform for salons & spas.", website: "https://www.zenoti.com/", category: "SaaS", location: "Hyderabad" },
  
  // User provided new startups
  { name: "Dodla Dairy", founder: "Dodla Sunil Reddy", description: "Dairy & food products.", website: "https://dodladairy.com/", category: "Others", location: "Hyderabad" },
  { name: "SFarmsIndia", founder: "Koteswara Rao Lingam", description: "Agri land marketplace.", website: "https://sfarmsindia.com/", category: "Others", location: "Hyderabad" },
  { name: "Marut Drones", founder: "Prem Kumar Vislawath", description: "Agricultural drone technology.", website: "https://marutdrones.com/", category: "Others", location: "Hyderabad" },
  { name: "CredRight", founder: "Neeraj Bansal", description: "Lending for small businesses.", website: "https://www.credright.com/", category: "Fintech", location: "Hyderabad" },
  { name: "Actlogica", founder: "Arijit Sen", description: "Fintech solutions for wealth management.", website: "https://actlogica.com/", category: "Fintech", location: "Hyderabad" },
  { name: "Paymatrix", founder: "Mukesh Chandra Anchuri", description: "Rent payment & property management.", website: "https://paymatrix.in/", category: "Fintech", location: "Hyderabad" },
  { name: "ChitMonks", founder: "Pavan Ponnaganti", description: "Blockchain based chit fund platform.", website: "https://www.chitmonks.com/", category: "Fintech", location: "Hyderabad" },
  { name: "Wehouse", founder: "Sravan Kumar", description: "Tech-enabled construction management.", website: "https://www.wehouse.in/", category: "Others", location: "Hyderabad" },
  { name: "FreshBus", founder: "Sudhakar Reddy Chirra", description: "Electric inter-city bus service.", website: "https://www.freshbus.com/", category: "Others", location: "Hyderabad" },
  { name: "ADAPT MOTORS", founder: "Adapt Team", description: "Smart mobility solutions.", website: "https://adaptmotors.com/", category: "Others", location: "Hyderabad" },
  { name: "Cyrrup Solutions", founder: "Gaurav Kumar", description: "Mobility & vehicle safety tech.", website: "https://www.cyrrup.com/", category: "Others", location: "Hyderabad" },
  { name: "WhistleDrive", founder: "Rakesh Munnanooru", description: "Employee transportation platform.", website: "https://www.whistledrive.com/", category: "Others", location: "Hyderabad" },
  { name: "Perceptyne", founder: "Raviteja Dodda", description: "Humanoid robotics & AI.", website: "https://www.perceptyne.com/", category: "AI & Deep Tech", location: "Hyderabad" },
  { name: "BlueSemi", founder: "Sunil Kumar Maddikatla", description: "Health-tech with non-invasive blood glucose monitors.", website: "https://www.bluesemi.io/", category: "Healthtech", location: "Hyderabad" },
  { name: "NextBillion AI", founder: "Gaurav Bubna", description: "Enterprise-grade map data and AI solutions.", website: "https://nextbillion.ai/", category: "AI & Deep Tech", location: "Hyderabad" },
  { name: "Zen Technologies", founder: "Ashok Atluri", description: "Defense training & simulation.", website: "https://www.zentechnologies.com/", category: "AI & Deep Tech", location: "Hyderabad" },
  { name: "Donatekart", founder: "Anil Kumar Reddy", description: "Social causes crowdfunding.", website: "https://www.donatekart.com/", category: "Others", location: "Hyderabad" },
  { name: "Swipe", founder: "Aditya Vemuganti", description: "Billing & ERP for SMEs.", website: "https://getswipe.in/", category: "SaaS", location: "Hyderabad" }
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/hydportal');
        console.log('Connected to MongoDB');
        
        await Startup.deleteMany({});
        console.log('Cleared existing startups');
        
        await Startup.insertMany(startups);
        console.log(`${startups.length} Startups seeded!`);
        
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedDB();
