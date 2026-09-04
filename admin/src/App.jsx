import React, { useState, useRef } from 'react';
import './App.css';
import { Mail, Home, Film, Briefcase, Settings, LogOut, FileText, Image as ImageIcon, Layout, Phone, Info, Save, Eye, ChevronDown, ChevronLeft, ChevronRight, Plus, Trash2, Edit2, PlayCircle, GripVertical, RefreshCw, Users, Upload, Flame, ToggleRight, ToggleLeft, ArrowRight, ExternalLink } from 'lucide-react';
import JoditEditor from 'jodit-react';
import { DEFAULT_VIDEOS } from './defaultVideos';
import staticBlogs from '../../client/src/data/entertainmentBlogs.json';
import staticMedia from '../../client/src/data/media.json';
import celeb1 from '../../client/src/assets/Films/celebs/Ashish - IMG_9131.jpg';
import celeb2 from '../../client/src/assets/Films/celebs/Surbhi jyoti.png';
import celeb3 from '../../client/src/assets/Films/celebs/Updendra limaye.png';
import celeb4 from '../../client/src/assets/Films/celebs/Vidya Malavade.png';
import celeb5 from '../../client/src/assets/Films/celebs/Zakir_New.jpg';
import celeb6 from '../../client/src/assets/Films/celebs/Navni Parihar.png';
import celeb7 from '../../client/src/assets/Films/celebs/durgesh kumar.jpg';
import celeb8 from '../../client/src/assets/Films/celebs/Pariva Pranati.png';
import celeb9 from '../../client/src/assets/Films/celebs/Tom Alter.png';
import celeb10 from '../../client/src/assets/Films/celebs/Seema Biswas.png';
import celeb11 from '../../client/src/assets/Films/celebs/kiran kumar.jpg';
import celeb12 from '../../client/src/assets/Films/celebs/Nibeditaa Paal.png';
import celeb13 from '../../client/src/assets/Films/celebs/Piyush Sahdev.png';

import clientImg1 from '../../client/src/assets/Films/ClientLogos/JioStar.png';
import clientImg2 from '../../client/src/assets/Films/ClientLogos/Star_plus_29.webp';
import clientImg3 from '../../client/src/assets/Films/ClientLogos/Red_Chillies_Entertainment_logo_1.jpg';
import clientImg4 from '../../client/src/assets/Films/ClientLogos/kuku-tv-logo-1763732193670.webp';
import clientImg5 from '../../client/src/assets/Films/ClientLogos/Copy of Amazon Prime Video logo.png';
import clientImg6 from '../../client/src/assets/Films/ClientLogos/tangy tv.jpg';
import clientImg7 from '../../client/src/assets/Films/ClientLogos/Pocket films.png';
import clientImg8 from '../../client/src/assets/Films/ClientLogos/2ndlast.png';
import clientImg9 from '../../client/src/assets/Films/ClientLogos/Last.png';

const JODIT_BLOG_CONFIG = {
  readonly: false,
  minHeight: 400,
  toolbarAdaptive: false,
  placeholder: 'Write your blog post here...',
  askBeforePasteHTML: false,
  askBeforePasteFromWord: false,
  defaultActionOnPaste: 'insert_as_html',
  buttons: ['fontsize', 'brush', 'font', 'bold', 'italic', 'underline', 'table', 'undo', 'redo']
};

const JODIT_MEDIA_CONFIG = {
  readonly: false,
  minHeight: 300,
  toolbarAdaptive: false,
  placeholder: 'Write article summary...',
  askBeforePasteHTML: false,
  askBeforePasteFromWord: false,
  defaultActionOnPaste: 'insert_as_html',
  buttons: ['fontsize', 'brush', 'font', 'bold', 'italic', 'underline', 'table', 'undo', 'redo']
};

import redHotImg1 from '../../client/src/assets/Films/Cards/Card2.jpg';
import microDramaImg from '../../client/src/assets/Agency/Filmthumbnails/Micro drama.png';
import redHotImg2 from '../../client/src/assets/Films/Cards/RedHot/Ai Show.png';
import redHotImg3 from '../../client/src/assets/Films/Cards/RedHot/Daily soap.png';

import poster1 from '../../client/src/assets/Films/Poster/1. Copy of Movie Poster_20x10.webp';
import poster2 from '../../client/src/assets/Films/Cards/Card2.jpg';
import poster3 from '../../client/src/assets/Films/Poster/2. Copy of Horizontal Poster_Main Tumhare Bachche.webp';
import poster4 from '../../client/src/assets/Films/Poster/3. Copy of Final Poster_No More MeToo.webp';
import poster5 from '../../client/src/assets/Films/Poster/4. Copy of IAYV_Horizontal Poster.webp';
import poster6 from '../../client/src/assets/Films/Poster/5. Corona is a Conspiracy.webp';
import poster7 from '../../client/src/assets/Films/Poster/6. Hum Azaad Hain.webp';
import poster8 from '../../client/src/assets/Films/Poster/9. 100 Short Films_Emerging Leaders.png';
import poster9 from '../../client/src/assets/Films/Cards/Card6.png';

import vp1 from '../../client/src/assets/Films/Poster/Micro drama Movie posters/1.webp';
import vp2 from '../../client/src/assets/Films/Poster/Micro drama Movie posters/2.webp';
import vp3 from '../../client/src/assets/Films/Poster/Micro drama Movie posters/3.webp';
import vp4 from '../../client/src/assets/Films/Poster/Micro drama Movie posters/4.webp';
import vp5 from '../../client/src/assets/Films/Poster/Micro drama Movie posters/5.webp';
import vp6 from '../../client/src/assets/Films/Poster/Micro drama Movie posters/6.webp';
import vp7 from '../../client/src/assets/Films/Poster/Micro drama Movie posters/7.webp';
import vp8 from '../../client/src/assets/Films/Poster/Micro drama Movie posters/8.webp';
import vp9 from '../../client/src/assets/Films/Poster/Micro drama Movie posters/9.webp';
import vp10 from '../../client/src/assets/Films/Poster/Micro drama Movie posters/10.webp';
import vp11 from '../../client/src/assets/Films/Poster/Micro drama Movie posters/11.webp';
import vp12 from '../../client/src/assets/Films/Poster/Micro drama Movie posters/12.webp';
import vp13 from '../../client/src/assets/Films/Poster/Micro drama Movie posters/13.webp';
import vp14 from '../../client/src/assets/Films/Poster/Micro drama Movie posters/14.webp';
import vp15 from '../../client/src/assets/Films/Poster/Micro drama Movie posters/15.webp';
import vp16 from '../../client/src/assets/Films/Poster/Micro drama Movie posters/16.webp';
import vp17 from '../../client/src/assets/Films/Poster/Micro drama Movie posters/17.webp';
import vp18 from '../../client/src/assets/Films/Poster/Micro drama Movie posters/18.webp';
import vp19 from '../../client/src/assets/Films/Poster/Micro drama Movie posters/19.webp';
import vp20 from '../../client/src/assets/Films/Poster/Micro drama Movie posters/20.webp';
import vp21 from '../../client/src/assets/Films/Poster/Micro drama Movie posters/21.webp';
import vp22 from '../../client/src/assets/Films/Poster/Micro drama Movie posters/22.webp';
import vp23 from '../../client/src/assets/Films/Poster/Micro drama Movie posters/23.webp';
import vp24 from '../../client/src/assets/Films/Poster/Micro drama Movie posters/24.webp';
import vp25 from '../../client/src/assets/Films/Poster/Micro drama Movie posters/25.webp';
import vp26 from '../../client/src/assets/Films/Poster/Micro drama Movie posters/26.webp';

// Mock Data State
const initialContent = {
  homepage: {
    hero: {
      film_heading: 'FILM PRODUCTION HOUSE',
      ampersand: '&',
      ad_heading: 'AD AGENCY',
      year_text: '2007',
      year_subtext: "IIT ENGINEER'S VENTURE",
      heading_blocks: [
        { id: 1, text: 'FILM', subtext: 'PRODUCTION HOUSE', bg_image: '', subtext_color: '#ef4444' },
        { id: 2, text: '&', subtext: '', bg_image: '', subtext_color: '#ef4444' },
        { id: 3, text: 'AD', subtext: 'AGENCY', bg_image: '', subtext_color: '#3b82f6' },
        { id: 4, text: '2007', subtext: "IIT ENGINEER'S VENTURE", bg_image: '', subtext_color: '#6b7280' }
      ]
    }
  },
  entertainment: {
    hero: {
      heading: 'ENTERTAINMENT FILMS',
      description: 'Award winning original content.'
    }
  },
  agency: {
    hero: {
      heading: 'REDASH AD AGENCY.',
      description: 'MARKETING CAMPAIGNS.'
    }
  },
  shared: {
    navigation: {
      home: 'Home',
      about: 'About',
      entertainment: 'Entertainment Films',
      blog: 'Blog',
      media: 'Media',
      contact: 'Contact'
    }
  }
};

function App() {
  const [content, setContent] = useState(initialContent);
  const [activeSidebar, setActiveSidebar] = useState(() => localStorage.getItem('adminActiveSidebar') || 'homepage');
  const [activeSubMenu, setActiveSubMenu] = useState(() => localStorage.getItem('adminActiveSubMenu') || 'hero');
  const [showAddBlogModal, setShowAddBlogModal] = useState(false);
  const [newBlog, setNewBlog] = useState({});
  const [showAddMediaModal, setShowAddMediaModal] = useState(false);
  const [newMedia, setNewMedia] = useState({});
  const [activeSubMenuState, setActiveSubMenuState] = useState(() => localStorage.getItem('adminActiveSubMenu') || 'hero');
  const [domain, setDomain] = useState('redashfilms.com');

  React.useEffect(() => {
    localStorage.setItem('adminActiveSidebar', activeSidebar);
  }, [activeSidebar]);

  React.useEffect(() => {
    localStorage.setItem('adminActiveSubMenu', activeSubMenu);
  }, [activeSubMenu]);
  const [loading, setLoading] = useState(true);
  const [editingVideoIndex, setEditingVideoIndex] = useState(null);
  const blogContentRef = useRef('');
  const mediaDescRef = useRef('');

  const defaultClients = [
    { name: 'Jio Star', img: clientImg1 },
    { name: 'Star Plus', img: clientImg2 },
    { name: 'Red Chillies', img: clientImg3 },
    { name: 'Kuku TV', img: clientImg4 },
    { name: 'Amazon Prime Video', img: clientImg5 },
    { name: 'Tangy TV', img: clientImg6 },
    { name: 'Pocket Films', img: clientImg7 },
    { name: 'Vertical TV', img: clientImg8 },
    { name: 'Alright TV', img: clientImg9 }
  ];

  const defaultRedHotCards = [
    {
      title: "THE CODPASTER",
      subtitle: "Produced the world's first fiction web series set in the world of podcasting, featuring a well-known star cast.",
      image: redHotImg1,
      badge1Text: "Mid-Day",
      badge1Url: "https://www.mid-day.com/buzzfeed/article/ashish-lal-the-iit-delhi-engineer-turned-actor-teams-up-with-surbhi-jyoti-and-upendra-limaye-9809",
      badge2Text: "TOI",
      badge2Url: "https://timesofindia.indiatimes.com/entertainment/hindi/bollywood/news/ashish-lal-explores-friendship-and-loss-in-the-codpaster/articleshow/131854264.cms"
    },
    {
      title: "AI SHOW",
      subtitle: "Producing an AI show for a premium entertainment company.",
      image: redHotImg2,
      badge1Text: "Coming Soon",
      badge1Url: "#",
      badge2Text: "",
      badge2Url: ""
    },
    {
      title: "DAILY SOAP",
      subtitle: "Developing an approved concept into a daily soap for one of India's leading television channels.",
      image: redHotImg3,
      badge1Text: "In Development",
      badge1Url: "#",
      badge2Text: "",
      badge2Url: ""
    },
    {
      title: "CASTING OUCH",
      subtitle: "Producing our sitcom web series Casting Ouch.",
      image: 'https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?q=80&w=800&auto=format&fit=crop',
      badge1Text: "Pre-Production",
      badge1Url: "#",
      badge2Text: "",
      badge2Url: ""
    }
  ];

  const defaultHorizontalProjects = [
    { id: "h1", title: "WITH LOVE, DELHI!", subtitle: "35 MONUMENTS... 1 3D SEARCH", image: poster1, link: "https://youtu.be/pIv7FFKm318?si=b_CUXqrAAxoaTjq0" },
    { id: "h2", title: "THE CODPASTER", subtitle: "PRODUCED THE WORLD'S FIRST FICTION WEB SERIES", image: poster2, link: "https://www.mid-day.com/buzzfeed/article/ashish-lal-the-iit-delhi-engineer-turned-actor-teams-up-with-surbhi-jyoti-and-upendra-limaye-9809" },
    { id: "h3", title: "MAIN TUMHARE BACHCHE...", subtitle: "HUMOROUS FAMILY DRAMA", image: poster3, link: "https://youtu.be/EhiWSgbQnQU?si=29Z1fEfaRTZqyo6G" },
    { id: "h4", title: "NO MORE #METOO", subtitle: "A FILM ON SEXUAL ABUSE", image: poster4, link: "https://youtu.be/5AGZjsdfOio?si=2CgTqSXIUs0_a-Ua" },
    { id: "h5", title: "I AM YOUR VOICE", subtitle: "A FILM BY ASHISH LAL", image: poster5, link: "https://youtu.be/BqGm3m3jyhI?si=K2jGDdZAKaOPKXnl" },
    { id: "h6", title: "CORONA IS A CONSPIRACY", subtitle: "SHORT DRAMA THRILLER", image: poster6, link: "https://youtu.be/6NusataOZyU?si=xoLP93n-qeuhEqK6" },
    { id: "h7", title: "HUM AZAAD HAIN", subtitle: "INDEPENDENT INDIE FILM", image: poster7, link: "https://youtu.be/-qHNIXVHT_4?si=rjrWz4zDIGye9Zhw" },
    { id: "h8", title: "100 SHORT FILMS", subtitle: "EMERGING LEADERS SERIES", image: poster8, link: "https://youtu.be/Rz0El0ooOwM?si=1TkAE07Ek8dbJm1w" },
    { id: "h9", title: "MUSIC VIDEOS", subtitle: "VISUALS THAT AMPLIFY SOUND", image: poster9, link: "https://youtu.be/6Q0mdzO9A4A?si=w_dZFv_p8FszDoDL" }
  ];

  const defaultVerticalProjects = [
    { id: "v1", title: "BILLIONAIRE ON PLANE", subtitle: "150M+ VIEWS MICRODRAMA", image: vp1, link: "https://premium.kukutv.app/show/billionaire-on-plane" },
    { id: "v2", title: "RACE AGAINST TIME", subtitle: "ACTION THRILLER SERIES", image: vp2, link: "https://www.instagram.com/reels/DVjKK5YSD3G/" },
    { id: "v3", title: "BAAZIGAAR BAAZ", subtitle: "HIGH STAKES DRAMA", image: vp3, link: "https://premium.kukutv.app/show/baazigaar-baaz" },
    { id: "v4", title: "BLUE DRUM HONEYMOON", subtitle: "MYSTERY DRAMA", image: vp4, link: "https://premium.kukutv.app/show/secret-boss-mera-baap" },
    { id: "v5", title: "BAAP BETA AUR BILLION", subtitle: "FAMILY ENTERTAINER", image: vp5, link: "https://premium.kukutv.app/show/billionaire-ki-waapsi" },
    { id: "v6", title: "THE CROREPATI SWEEPER WALA", subtitle: "TANGY TV ORIGINAL", image: vp6, link: "http://premium.kukutv.app/show/mrs-by-mistake" },
    { id: "v7", title: "FAMILY SECRET", subtitle: "EMOTIONAL DRAMA", image: vp7, link: "https://premium.kukutv.app/show/jobless-ghar-jamai-16" },
    { id: "v8", title: "DACAIT AUR DEVI", subtitle: "ACTION ADVENTURE", image: vp8, link: "https://premium.kukutv.app/show/ek-mehenga-divorce" },
    { id: "v9", title: "MRS. BY...", subtitle: "ROMANTIC DRAMA", image: vp9, link: "https://premium.kukutv.app/show/the-little-pool-master" },
    { id: "v10", title: "THE ROYAL...", subtitle: "ROYAL SAGA", image: vp10, link: "https://premium.kukutv.app/show/fake-girlfriend" },
    { id: "v11", title: "RED SAREE RIDER", subtitle: "MICRO DRAMA THRILLER", image: vp11, link: "https://premium.kukutv.app/show/death-notification" },
    { id: "v12", title: "NIGHT RIDER", subtitle: "ACTION THRILLER", image: vp12, link: "https://premium.kukutv.app/show/ek-anjana-rishta" },
    { id: "v13", title: "DRAMA SERIES 13", subtitle: "ORIGINAL MICRO DRAMA", image: vp13, link: "https://premium.kukutv.app/show/metro-wala-panga" },
    { id: "v14", title: "DRAMA SERIES 14", subtitle: "ORIGINAL MICRO DRAMA", image: vp14, link: "https://premium.kukutv.app/show/chaiwala-hero" },
    { id: "v15", title: "DRAMA SERIES 15", subtitle: "ORIGINAL MICRO DRAMA", image: vp15, link: "https://premium.kukutv.app/show/born-to-rise" },
    { id: "v16", title: "DRAMA SERIES 16", subtitle: "ORIGINAL MICRO DRAMA", image: vp16, link: "https://premium.kukutv.app/show/2bb32b69-c8e3-4033-b26a-56ee5403e51a" },
    { id: "v17", title: "DRAMA SERIES 17", subtitle: "ORIGINAL MICRO DRAMA", image: vp17, link: "https://premium.kukutv.app/show/knock-do-not-open-the-door" },
    { id: "v18", title: "DRAMA SERIES 18", subtitle: "ORIGINAL MICRO DRAMA", image: vp18, link: "https://premium.kukutv.app/show/wheelchair-billionaire" },
    { id: "v19", title: "DRAMA SERIES 19", subtitle: "ORIGINAL MICRO DRAMA", image: vp19, link: "#" },
    { id: "v20", title: "DRAMA SERIES 20", subtitle: "ORIGINAL MICRO DRAMA", image: vp20, link: "#" },
    { id: "v21", title: "DRAMA SERIES 21", subtitle: "ORIGINAL MICRO DRAMA", image: vp21, link: "#" },
    { id: "v22", title: "DRAMA SERIES 22", subtitle: "ORIGINAL MICRO DRAMA", image: vp22, link: "#" },
    { id: "v23", title: "DRAMA SERIES 23", subtitle: "ORIGINAL MICRO DRAMA", image: vp23, link: "#" },
    { id: "v24", title: "DRAMA SERIES 24", subtitle: "ORIGINAL MICRO DRAMA", image: vp24, link: "#" },
    { id: "v25", title: "DRAMA SERIES 25", subtitle: "ORIGINAL MICRO DRAMA", image: vp25, link: "#" },
    { id: "v26", title: "DRAMA SERIES 26", subtitle: "ORIGINAL MICRO DRAMA", image: vp26, link: "#" }
  ];

  const [showAddCelebModal, setShowAddCelebModal] = useState(false);
  const [newCeleb, setNewCeleb] = useState({ rowKey: 'row1', name: '', img: '' });
  const [draggedCelebIndex, setDraggedCelebIndex] = useState(null);
  const [draggedTalentIndex, setDraggedTalentIndex] = useState(null);
  const [draggedRowKey, setDraggedRowKey] = useState(null);
  const autoScrollRef = useRef(null);

  const [showAddClientModal, setShowAddClientModal] = useState(false);
  const [newClient, setNewClient] = useState({ name: '', img: '' });
  const [draggedClientIndex, setDraggedClientIndex] = useState(null);

  const [showAddRedHotModal, setShowAddRedHotModal] = useState(false);
  const [newRedHotCard, setNewRedHotCard] = useState({
    title: '',
    subtitle: '',
    image: '',
    badge1Text: '',
    badge1Url: '',
    badge2Text: '',
    badge2Url: ''
  });
  const [draggedRedHotIndex, setDraggedRedHotIndex] = useState(null);

  // Entertainment Projects State
  const [showAddProjectModal, setShowAddProjectModal] = useState(false);
  const [projectCardType, setProjectCardType] = useState('horizontal'); // 'horizontal' or 'vertical'
  const [newProjectCard, setNewProjectCard] = useState({ title: '', subtitle: '', image: '', link: '' });
  const [draggedProjectState, setDraggedProjectState] = useState({ type: null, index: null });

  const handleUpdateProjectCard = (type, index, field, value) => {
    setContent(prev => {
      const newState = JSON.parse(JSON.stringify(prev));
      if (!newState.entertainment) newState.entertainment = {};
      if (!newState.entertainment.projects) newState.entertainment.projects = {};
      const key = type === 'horizontal' ? 'horizontalCards' : 'verticalCards';
      const defaultArr = type === 'horizontal' ? defaultHorizontalProjects : defaultVerticalProjects;
      if (!newState.entertainment.projects[key]) {
        newState.entertainment.projects[key] = JSON.parse(JSON.stringify(defaultArr));
      }
      if (newState.entertainment.projects[key][index]) {
        newState.entertainment.projects[key][index][field] = value;
      }
      return newState;
    });
  };

  const handleProjectFileUpload = (e, type, index) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      handleUpdateProjectCard(type, index, 'image', reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleOpenAddProjectModal = (type) => {
    setProjectCardType(type);
    setNewProjectCard({ title: '', subtitle: '', image: '', link: '' });
    setShowAddProjectModal(true);
  };

  const handleConfirmAddProjectModal = () => {
    setContent(prev => {
      const newState = JSON.parse(JSON.stringify(prev));
      if (!newState.entertainment) newState.entertainment = {};
      if (!newState.entertainment.projects) newState.entertainment.projects = {};
      const key = projectCardType === 'horizontal' ? 'horizontalCards' : 'verticalCards';
      const defaultArr = projectCardType === 'horizontal' ? defaultHorizontalProjects : defaultVerticalProjects;
      if (!newState.entertainment.projects[key]) {
        newState.entertainment.projects[key] = JSON.parse(JSON.stringify(defaultArr));
      }
      newState.entertainment.projects[key].push({
        id: `${projectCardType[0]}-${Date.now()}`,
        title: "",
        subtitle: "",
        image: newProjectCard.image || 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?q=80&w=800&auto=format&fit=crop',
        link: newProjectCard.link.trim() || '#'
      });
      return newState;
    });
    setShowAddProjectModal(false);
    setToast({ show: true, message: `Added new project card. Click 'Save Section Changes' to publish!`, type: 'success' });
  };

  const handleRemoveProjectCard = (type, index) => {
    setContent(prev => {
      const newState = JSON.parse(JSON.stringify(prev));
      const key = type === 'horizontal' ? 'horizontalCards' : 'verticalCards';
      if (!newState.entertainment?.projects?.[key]) return prev;
      newState.entertainment.projects[key].splice(index, 1);
      return newState;
    });
  };

  const handleMoveProjectCard = (type, index, direction) => {
    setContent(prev => {
      const newState = JSON.parse(JSON.stringify(prev));
      if (!newState.entertainment) newState.entertainment = {};
      if (!newState.entertainment.projects) newState.entertainment.projects = {};
      const key = type === 'horizontal' ? 'horizontalCards' : 'verticalCards';
      const defaultArr = type === 'horizontal' ? defaultHorizontalProjects : defaultVerticalProjects;
      if (!newState.entertainment.projects[key]) {
        newState.entertainment.projects[key] = JSON.parse(JSON.stringify(defaultArr));
      }
      const items = newState.entertainment.projects[key];
      const targetIndex = index + direction;
      if (targetIndex < 0 || targetIndex >= items.length) return prev;
      const [movedItem] = items.splice(index, 1);
      items.splice(targetIndex, 0, movedItem);
      return newState;
    });
  };

  const handleProjectDragStart = (e, type, index) => {
    setDraggedProjectState({ type, index });
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleProjectDragOver = (e, type, index) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    startAutoScrollIfNeeded(e.clientY);
  };

  const handleProjectDrop = (e, targetType, targetIndex) => {
    e.preventDefault();
    stopAutoScroll();

    if (draggedProjectState.index === null || draggedProjectState.type !== targetType || draggedProjectState.index === targetIndex) {
      setDraggedProjectState({ type: null, index: null });
      return;
    }

    setContent(prev => {
      const newState = JSON.parse(JSON.stringify(prev));
      if (!newState.entertainment) newState.entertainment = {};
      if (!newState.entertainment.projects) newState.entertainment.projects = {};
      const key = targetType === 'horizontal' ? 'horizontalCards' : 'verticalCards';
      const defaultArr = targetType === 'horizontal' ? defaultHorizontalProjects : defaultVerticalProjects;
      if (!newState.entertainment.projects[key]) {
        newState.entertainment.projects[key] = JSON.parse(JSON.stringify(defaultArr));
      }

      const items = newState.entertainment.projects[key];
      const fromIdx = draggedProjectState.index;
      if (fromIdx >= 0 && fromIdx < items.length) {
        const [movedItem] = items.splice(fromIdx, 1);
        items.splice(targetIndex, 0, movedItem);
      }

      return newState;
    });

    setDraggedProjectState({ type: null, index: null });
  };

  const handleUpdateRedHotCard = (index, field, value) => {
    setContent(prev => {
      const newState = JSON.parse(JSON.stringify(prev));
      if (!newState.entertainment) newState.entertainment = {};
      if (!newState.entertainment.redHotCards) {
        newState.entertainment.redHotCards = JSON.parse(JSON.stringify(defaultRedHotCards));
      }
      if (newState.entertainment.redHotCards[index]) {
        newState.entertainment.redHotCards[index][field] = value;
      }
      return newState;
    });
  };

  const handleRedHotFileUpload = (e, index) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      handleUpdateRedHotCard(index, 'image', reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleOpenAddRedHotModal = () => {
    setNewRedHotCard({
      title: '',
      subtitle: '',
      image: '',
      badge1Text: '',
      badge1Url: '',
      badge2Text: '',
      badge2Url: ''
    });
    setShowAddRedHotModal(true);
  };

  const handleConfirmAddRedHotModal = () => {
    if (!newRedHotCard.title.trim()) {
      alert("Please enter a title for the Red Hot card.");
      return;
    }
    setContent(prev => {
      const newState = JSON.parse(JSON.stringify(prev));
      if (!newState.entertainment) newState.entertainment = {};
      if (!newState.entertainment.redHotCards) {
        newState.entertainment.redHotCards = JSON.parse(JSON.stringify(defaultRedHotCards));
      }
      newState.entertainment.redHotCards.push({
        title: newRedHotCard.title.trim(),
        subtitle: newRedHotCard.subtitle.trim(),
        image: newRedHotCard.image || 'https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?q=80&w=800&auto=format&fit=crop',
        badge1Text: newRedHotCard.badge1Text.trim(),
        badge1Url: newRedHotCard.badge1Url.trim(),
        badge2Text: newRedHotCard.badge2Text.trim(),
        badge2Url: newRedHotCard.badge2Url.trim()
      });
      return newState;
    });
    setShowAddRedHotModal(false);
    setToast({ show: true, message: `Added "${newRedHotCard.title}". Click 'Save Section Changes' to publish!`, type: 'success' });
  };

  const handleRemoveRedHotCard = (index) => {
    setContent(prev => {
      const newState = JSON.parse(JSON.stringify(prev));
      if (!newState.entertainment?.redHotCards) return prev;
      newState.entertainment.redHotCards.splice(index, 1);
      return newState;
    });
  };

  const handleRedHotDragStart = (e, index) => {
    setDraggedRedHotIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleRedHotDragOver = (e, index) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    startAutoScrollIfNeeded(e.clientY);
  };

  const handleRedHotDrop = (e, targetIndex) => {
    e.preventDefault();
    stopAutoScroll();

    if (draggedRedHotIndex === null || draggedRedHotIndex === targetIndex) return;

    setContent(prev => {
      const newState = JSON.parse(JSON.stringify(prev));
      if (!newState.entertainment) newState.entertainment = {};
      if (!newState.entertainment.redHotCards) {
        newState.entertainment.redHotCards = JSON.parse(JSON.stringify(defaultRedHotCards));
      }

      const items = newState.entertainment.redHotCards;
      if (draggedRedHotIndex >= 0 && draggedRedHotIndex < items.length) {
        const [movedItem] = items.splice(draggedRedHotIndex, 1);
        items.splice(targetIndex, 0, movedItem);
      }

      return newState;
    });

    setDraggedRedHotIndex(null);
  };

  const handleMoveRedHotCard = (index, direction) => {
    setContent(prev => {
      const newState = JSON.parse(JSON.stringify(prev));
      if (!newState.entertainment) newState.entertainment = {};
      if (!newState.entertainment.redHotCards) {
        newState.entertainment.redHotCards = JSON.parse(JSON.stringify(defaultRedHotCards));
      }
      const items = newState.entertainment.redHotCards;
      const targetIndex = index + direction;
      if (targetIndex < 0 || targetIndex >= items.length) return prev;
      const [movedItem] = items.splice(index, 1);
      items.splice(targetIndex, 0, movedItem);
      return newState;
    });
  };

  const handleUpdateClient = (index, field, value) => {
    setContent(prev => {
      const newState = JSON.parse(JSON.stringify(prev));
      if (!newState.entertainment) newState.entertainment = {};
      if (!newState.entertainment.clients) {
        newState.entertainment.clients = JSON.parse(JSON.stringify(defaultClients));
      }
      if (newState.entertainment.clients[index]) {
        newState.entertainment.clients[index][field] = value;
      }
      return newState;
    });
  };

  const handleClientFileUpload = (e, index) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      handleUpdateClient(index, 'img', reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleOpenAddClientModal = () => {
    setNewClient({ name: '', img: '' });
    setShowAddClientModal(true);
  };

  const handleConfirmAddClientModal = () => {
    if (!newClient.img) {
      alert("Please upload or provide an image for the logo.");
      return;
    }
    setContent(prev => {
      const newState = JSON.parse(JSON.stringify(prev));
      if (!newState.entertainment) newState.entertainment = {};
      if (!newState.entertainment.clients) {
        newState.entertainment.clients = JSON.parse(JSON.stringify(defaultClients));
      }
      newState.entertainment.clients.push({
        name: `Logo ${newState.entertainment.clients.length + 1}`,
        img: newClient.img
      });
      return newState;
    });
    setShowAddClientModal(false);
    setToast({ show: true, message: `Added new partner logo. Click 'Save Section Changes' to publish!`, type: 'success' });
  };

  const handleRemoveClient = (index) => {
    setContent(prev => {
      const newState = JSON.parse(JSON.stringify(prev));
      if (!newState.entertainment?.clients) return prev;
      newState.entertainment.clients.splice(index, 1);
      return newState;
    });
  };

  const handleClientDragStart = (e, index) => {
    setDraggedClientIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleClientDragOver = (e, index) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    startAutoScrollIfNeeded(e.clientY);
  };

  const handleClientDrop = (e, targetIndex) => {
    e.preventDefault();
    stopAutoScroll();

    if (draggedClientIndex === null || draggedClientIndex === targetIndex) return;

    setContent(prev => {
      const newState = JSON.parse(JSON.stringify(prev));
      if (!newState.entertainment) newState.entertainment = {};
      if (!newState.entertainment.clients) {
        newState.entertainment.clients = JSON.parse(JSON.stringify(defaultClients));
      }

      const items = newState.entertainment.clients;
      if (draggedClientIndex >= 0 && draggedClientIndex < items.length) {
        const [movedItem] = items.splice(draggedClientIndex, 1);
        items.splice(targetIndex, 0, movedItem);
      }

      return newState;
    });

    setDraggedClientIndex(null);
  };

  const handleMoveClient = (index, direction) => {
    setContent(prev => {
      const newState = JSON.parse(JSON.stringify(prev));
      if (!newState.entertainment) newState.entertainment = {};
      if (!newState.entertainment.clients) {
        newState.entertainment.clients = JSON.parse(JSON.stringify(defaultClients));
      }
      const items = newState.entertainment.clients;
      const targetIndex = index + direction;
      if (targetIndex < 0 || targetIndex >= items.length) return prev;
      const [movedItem] = items.splice(index, 1);
      items.splice(targetIndex, 0, movedItem);
      return newState;
    });
  };

  const stopAutoScroll = () => {
    if (autoScrollRef.current) {
      clearInterval(autoScrollRef.current);
      autoScrollRef.current = null;
    }
  };

  const startAutoScrollIfNeeded = (clientY) => {
    const sensitivity = 180;
    const scrollSpeed = 22;
    const viewportHeight = window.innerHeight;

    let direction = 0;
    if (clientY < sensitivity) {
      direction = -1; // UP
    } else if (clientY > viewportHeight - sensitivity) {
      direction = 1; // DOWN
    }

    if (direction === 0) {
      stopAutoScroll();
      return;
    }

    if (!autoScrollRef.current) {
      autoScrollRef.current = setInterval(() => {
        const containers = [
          document.querySelector('.main-editor-area'),
          document.querySelector('.editor-grid'),
          document.querySelector('.editor-form-pane'),
          document.querySelector('.cms-body')
        ];

        let scrolledAny = false;
        for (const el of containers) {
          if (el && el.scrollHeight > el.clientHeight) {
            el.scrollTop += direction * scrollSpeed;
            scrolledAny = true;
          }
        }
        window.scrollBy(0, direction * scrollSpeed);
      }, 16);
    }
  };

  const handleCelebDragStart = (e, rowKey, index) => {
    setDraggedRowKey(rowKey);
    setDraggedCelebIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleCelebDragOver = (e, rowKey, index) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    startAutoScrollIfNeeded(e.clientY);
  };

  const handleCelebDrop = (e, targetRowKey, targetIndex) => {
    e.preventDefault();
    stopAutoScroll();

    if (draggedCelebIndex === null || !draggedRowKey) return;
    if (draggedRowKey === targetRowKey && draggedCelebIndex === targetIndex) return;

    setContent(prev => {
      const newState = JSON.parse(JSON.stringify(prev));
      if (!newState.entertainment) newState.entertainment = {};
      if (!newState.entertainment.featuredCelebs) {
        newState.entertainment.featuredCelebs = JSON.parse(JSON.stringify(defaultFeaturedCelebs));
      }

      const sourceItems = newState.entertainment.featuredCelebs[draggedRowKey] || [];
      const targetItems = newState.entertainment.featuredCelebs[targetRowKey] || [];

      if (draggedCelebIndex >= 0 && draggedCelebIndex < sourceItems.length) {
        const [movedItem] = sourceItems.splice(draggedCelebIndex, 1);
        targetItems.splice(targetIndex, 0, movedItem);
      }

      return newState;
    });

    setDraggedCelebIndex(null);
    setDraggedRowKey(null);
  };

  const handleMoveCelebToRow = (sourceRowKey, index, targetRowKey) => {
    if (sourceRowKey === targetRowKey) return;

    setContent(prev => {
      const newState = JSON.parse(JSON.stringify(prev));
      if (!newState.entertainment) newState.entertainment = {};
      if (!newState.entertainment.featuredCelebs) {
        newState.entertainment.featuredCelebs = JSON.parse(JSON.stringify(defaultFeaturedCelebs));
      }

      const sourceItems = newState.entertainment.featuredCelebs[sourceRowKey] || [];
      const targetItems = newState.entertainment.featuredCelebs[targetRowKey] || [];

      if (index >= 0 && index < sourceItems.length) {
        const [movedItem] = sourceItems.splice(index, 1);
        targetItems.push(movedItem);
      }

      return newState;
    });

    setToast({ 
      show: true, 
      message: `Moved celebrity to ${targetRowKey === 'row1' ? 'Row 1' : 'Row 2'}. Click 'Save Section Changes' to publish!`, 
      type: 'success' 
    });
  };

  const handleMoveCeleb = (rowKey, index, direction) => {
    setContent(prev => {
      const newState = JSON.parse(JSON.stringify(prev));
      if (!newState.entertainment) newState.entertainment = {};
      if (!newState.entertainment.featuredCelebs) {
        newState.entertainment.featuredCelebs = JSON.parse(JSON.stringify(defaultFeaturedCelebs));
      }

      const items = newState.entertainment.featuredCelebs[rowKey] || [];
      const targetIndex = index + direction;
      if (targetIndex < 0 || targetIndex >= items.length) return prev;

      const [movedItem] = items.splice(index, 1);
      items.splice(targetIndex, 0, movedItem);

      return newState;
    });
  };

  const handleOpenAddCelebModal = (defaultRow = 'row1') => {
    setNewCeleb({ rowKey: defaultRow, name: '', img: '' });
    setShowAddCelebModal(true);
  };

  const handleConfirmAddCelebModal = () => {
    if (!newCeleb.name.trim()) {
      alert("Please enter a celebrity name.");
      return;
    }
    
    setContent(prev => {
      const newState = JSON.parse(JSON.stringify(prev));
      if (!newState.entertainment) newState.entertainment = {};
      if (!newState.entertainment.featuredCelebs) {
        newState.entertainment.featuredCelebs = JSON.parse(JSON.stringify(defaultFeaturedCelebs));
      }
      const targetRow = newCeleb.rowKey || 'row1';
      if (!newState.entertainment.featuredCelebs[targetRow]) {
        newState.entertainment.featuredCelebs[targetRow] = [];
      }
      newState.entertainment.featuredCelebs[targetRow].push({
        name: newCeleb.name.trim(),
        img: newCeleb.img
      });
      return newState;
    });

    setShowAddCelebModal(false);
    setToast({ show: true, message: `Added "${newCeleb.name}" to ${newCeleb.rowKey === 'row1' ? 'Row 1' : 'Row 2'}. Click 'Save Section Changes' to publish!`, type: 'success' });
  };

  // Helper to extract YouTube ID
  const extractYouTubeId = (url) => {
    if (!url) return '';
    // If it's exactly 11 chars (just the ID)
    if (/^[a-zA-Z0-9_-]{11}$/.test(url)) return url;
    // Extract from ID with query string like ID?si=...
    const idMatch = url.match(/^([a-zA-Z0-9_-]{11})\?/);
    if (idMatch) return idMatch[1];
    
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\/shorts\/)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : '';
  };

  // Fetch initial content from API
  React.useEffect(() => {
    fetch('http://localhost:5000/api/content')
      .then(res => res.json())
      .then(data => {
        let finalData = data;
        
        if (Object.keys(finalData).length > 0) {
          if (finalData.homepage?.video_tile?.videos) {
            finalData.homepage.video_tile.videos = finalData.homepage.video_tile.videos.map((v, i) => {
              if (!v.uniqueId) v.uniqueId = `vid-${Date.now()}-${i}`;
              
              // Fallback for static thumbnails that might be empty in the DB
              if (v.id === 'web-series' && (!v.thumbnail || v.thumbnail === '')) {
                v.thumbnail = redHotImg1;
              }
              if (v.id === 'kukufm' && (!v.thumbnail || v.thumbnail === '')) {
                v.thumbnail = microDramaImg;
              }
              
              return v;
            });
          }
          setContent(prev => ({
            ...prev,
            ...finalData
          }));
        } else {
          setContent(initialContent);
        }
        setLoading(false);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch content:', err);
        setLoading(false);
      });
  }, []);

  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
  };

  const handleOpenAddBlogModal = (blog, idx = null) => {
    if (blog) {
      setNewBlog({ ...blog, _idx: idx });
      blogContentRef.current = blog.content || '';
    } else {
      setNewBlog({ title: '', slug: '', date: new Date().toISOString().split('T')[0], imageUrl: '', content: '', _idx: null });
      blogContentRef.current = '';
    }
    setShowAddBlogModal(true);
  };

  const handleConfirmAddBlogModal = () => {
    if (!newBlog.title) {
      alert('Blog Title is required');
      return;
    }
    const newState = JSON.parse(JSON.stringify(content));
    if (!newState.entertainment) newState.entertainment = {};
    if (!newState.entertainment.blogs) newState.entertainment.blogs = [];
    
    if (!newBlog.slug) {
      newBlog.slug = newBlog.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    }
    if (!newBlog.id) {
      newBlog.id = Date.now();
    }
    newBlog.content = blogContentRef.current;

    if (newBlog._idx !== null && newBlog._idx !== undefined) {
      if (typeof newBlog._idx === 'string' && newBlog._idx.startsWith('static_')) {
        newState.entertainment.blogs.push(newBlog);
      } else {
        newState.entertainment.blogs[newBlog._idx] = newBlog;
      }
    } else {
      newState.entertainment.blogs.push(newBlog);
    }
    handleSave(newState);
    setShowAddBlogModal(false);
  };

  const handleOpenAddMediaModal = (mediaItem, idx = null) => {
    if (mediaItem) {
      setNewMedia({ ...mediaItem, _idx: idx });
      mediaDescRef.current = mediaItem.description || '';
    } else {
      setNewMedia({ id: 'media_' + Date.now(), source: '', title: '', description: '', url: '', image: '', _idx: null });
      mediaDescRef.current = '';
    }
    setShowAddMediaModal(true);
  };

  const handleConfirmAddMediaModal = () => {
    if (!newMedia.title || !newMedia.source) {
      alert('Source and Title are required');
      return;
    }
    const newState = JSON.parse(JSON.stringify(content));
    if (!newState.entertainment) newState.entertainment = {};
    if (!newState.entertainment.media) newState.entertainment.media = [];
    
    newMedia.description = mediaDescRef.current;

    if (newMedia._idx !== null && newMedia._idx !== undefined) {
      if (typeof newMedia._idx === 'string' && newMedia._idx.startsWith('static_')) {
        newState.entertainment.media.push(newMedia);
      } else {
        newState.entertainment.media[newMedia._idx] = newMedia;
      }
    } else {
      newState.entertainment.media.push(newMedia);
    }
    handleSave(newState);
    setShowAddMediaModal(false);
  };

  const handleSave = async (dataToSave = null) => {
    try {
      const stateToUse = dataToSave && typeof dataToSave === 'object' ? dataToSave : content;
      let dbKey = activeSidebar;
      if (activeSidebar.startsWith('entertainment') && activeSidebar !== 'entertainment-films') {
        dbKey = 'entertainment';
      }
      if (activeSidebar === 'homepage-media') {
        dbKey = 'homepage';
      }
      if (activeSidebar === 'global-contact') {
        dbKey = 'global';
      }
      if (activeSidebar === 'global-contact') {
        dbKey = 'global';
      }
      
      const payload = stateToUse[dbKey] || (stateToUse.entertainment && dbKey === 'entertainment' ? stateToUse.entertainment : {});
      const res = await fetch(`http://localhost:5000/api/content/${dbKey}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: payload })
      });
      
      if (res.ok) {
        showToast('Changes saved successfully!', 'success');
      } else {
        showToast('Failed to save changes.', 'error');
      }
    } catch (err) {
      console.error(err);
      showToast('Error saving changes.', 'error');
    }
  };

  // Handle field updates for flat structure
  const handleUpdate = (section, field, value) => {
    setContent(prev => {
      let defaultSection = {};
      
      if (activeSidebar === 'homepage' || activeSidebar === 'entertainment' || activeSidebar === 'agency' || activeSidebar === 'shared') {
        if (section === 'quotation') {
          let defaultText1 = 'Potential clients can fill this form or email us at';
          if (activeSidebar === 'entertainment') {
            defaultText1 = 'Potential investors/sponsors can fill this form or email us at';
          } else if (activeSidebar === 'agency') {
            defaultText1 = 'Brands and Corporates can fill this form or email us at';
          }
          
          defaultSection = {
            text1: defaultText1,
            email1: 'info@redashfilms.com',
            text2: 'Actors, Film Crew Members & Vendors can email their profiles only at',
            email2: 'redash.films@gmail.com',
            officeText: 'RedAsh Office:',
            officeAddress: '1101, Peninsula Park, Fun Republic Lane, Andheri West, Mumbai, 400053',
            mapLinkText: '(Google Location)',
            mapLinkUrl: 'https://share.google/Pxp4Tva4m3IyfrKAd'
          };
        }
      }

      if (activeSidebar === 'homepage') {
        if (section === 'logo') {
          defaultSection = { url: '' };
        } else if (section === 'mediaLinks') {
          defaultSection = {
            instagram: 'https://www.instagram.com/redashfilms/',
            facebook: 'https://www.facebook.com/RedashFilms/',
            linkedin: 'https://www.linkedin.com/company/redash-films/',
            youtube: 'https://www.youtube.com/@redashfilms'
          };
        }
      } else if (activeSidebar === 'entertainment') {
        if (section === 'logo') {
          defaultSection = { url: '' };
        } else if (section === 'navigation') {
          defaultSection = {
            home: 'HOME', about: 'ABOUT', films: 'ENTERTAINMENT FILMS',
            blog: 'BLOG', media: 'MEDIA', contact: 'CONTACT'
          };
        } else if (section === 'hero') {
          defaultSection = {
            line1: 'SUBSTANCE',
            line2: 'MEETS',
            line3: 'MASS ',
            line4_p1: 'APPEAL ',
            line4_p2: 'AT',
            line5_p1: 'RED',
            line5_p2: 'ASH ',
            line5_p3: 'FILMS',
            btnText: 'Watch More Entertainment Films'
          };
        }
      }

      return {
        ...prev,
        [activeSidebar]: {
          ...prev[activeSidebar],
          [section]: {
            ...defaultSection,
            ...(prev[activeSidebar]?.[section] || {}),
            [field]: value
          }
        }
      };
    });
  };

  // Handle dynamic block array updates specifically for homepage hero
  const handleUpdateBlock = (index, field, value) => {
    setContent(prev => {
      const newState = { ...prev };
      
      if (!newState.homepage) newState.homepage = {};
      if (!newState.homepage.hero) newState.homepage.hero = {};
      
      const currentBlocks = newState.homepage.hero.heading_blocks || [
        { id: 1, text: 'FILM', subtext: 'PRODUCTION HOUSE', bg_image: '', subtext_color: '#ef4444' },
        { id: 2, text: '&', subtext: '', bg_image: '', subtext_color: '#ef4444' },
        { id: 3, text: 'AD', subtext: 'AGENCY', bg_image: '', subtext_color: '#3b82f6' },
        { id: 4, text: '2007', subtext: "IIT ENGINEER'S VENTURE", bg_image: '', subtext_color: '#6b7280' }
      ];
      
      const updatedBlocks = [...currentBlocks];
      updatedBlocks[index] = { ...updatedBlocks[index], [field]: value };
      
      newState.homepage.hero.heading_blocks = updatedBlocks;
      return newState;
    });
  };

  const handleAddBlock = () => {
    setContent(prev => {
      const newState = { ...prev };
      const currentBlocks = newState.homepage.hero.heading_blocks || [];
      const updatedBlocks = [...currentBlocks];
      updatedBlocks.push({ 
        id: Date.now(), 
        text: '', 
        subtext: '', 
        bg_image: '',
        subtext_color: '#ef4444'
      });
      newState.homepage.hero.heading_blocks = updatedBlocks;
      return newState;
    });
  };

  const handleRemoveBlock = (index) => {
    setContent(prev => {
      const newState = { ...prev };
      const currentBlocks = newState.homepage.hero.heading_blocks || [];
      const updatedBlocks = [...currentBlocks];
      updatedBlocks.splice(index, 1);
      newState.homepage.hero.heading_blocks = updatedBlocks;
      return newState;
    });
  };

  const handleUpdateHeroCard = (index, field, value) => {
    setContent(prev => {
      const defaultCards = [
        { title: "MOVIES", link: "", image: "http://localhost:5173/src/assets/Films/Cards/Card1.jpg" },
        { title: "WEB SERIES", link: "", image: "http://localhost:5173/src/assets/Films/Cards/Card2.jpg" },
        { title: "MICRO DRAMAS", link: "", image: "http://localhost:5173/src/assets/Films/Cards/Card3.png" },
        { title: "SHORT FILMS", link: "", image: "https://img.youtube.com/vi/5AGZjsdfOio/hqdefault.jpg" },
        { title: "AI FILMS", link: "", image: "http://localhost:5173/src/assets/Films/Cards/Card5.png" },
        { title: "MUSIC VIDEOS", link: "", image: "http://localhost:5173/src/assets/Films/Cards/Card6.png" }
      ];

      const currentCards = prev.entertainment?.heroCards || defaultCards;
      const updatedCards = currentCards.map((card, i) => {
        if (i !== index) return { ...card };
        const updatedCard = { ...card, [field]: value };
        
        // If user is typing a YouTube link, auto-fetch the thumbnail
        if (field === 'link' && value) {
          const videoId = extractYouTubeId(value);
          if (videoId) {
            updatedCard.image = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
          }
        }
        
        return updatedCard;
      });
      
      return {
        ...prev,
        entertainment: {
          ...(prev.entertainment || {}),
          heroCards: updatedCards
        }
      };
    });
  };

  const handleResetHeroCards = () => {
    setContent(prev => {
      const defaultCards = [
        { title: "MOVIES", link: "", image: "http://localhost:5173/src/assets/Films/Cards/Card1.jpg" },
        { title: "WEB SERIES", link: "", image: "http://localhost:5173/src/assets/Films/Cards/Card2.jpg" },
        { title: "MICRO DRAMAS", link: "", image: "http://localhost:5173/src/assets/Films/Cards/Card3.png" },
        { title: "SHORT FILMS", link: "", image: "https://img.youtube.com/vi/5AGZjsdfOio/hqdefault.jpg" },
        { title: "AI FILMS", link: "", image: "http://localhost:5173/src/assets/Films/Cards/Card5.png" },
        { title: "MUSIC VIDEOS", link: "", image: "http://localhost:5173/src/assets/Films/Cards/Card6.png" }
      ];
      return {
        ...prev,
        entertainment: {
          ...(prev.entertainment || {}),
          heroCards: defaultCards
        }
      };
    });
  };

  // Handle Video Tile Updates
  const handleUpdateVideo = (index, field, value) => {
    setContent(prev => {
      const currentVideos = prev.homepage?.video_tile?.videos || DEFAULT_VIDEOS;
      const updatedVideos = [...currentVideos];
      
      updatedVideos[index] = { ...updatedVideos[index], [field]: value };
      
      // Auto-extract ID if URL changes
      if (field === 'url') {
        updatedVideos[index].id = extractYouTubeId(value) || updatedVideos[index].id;
        if (!updatedVideos[index].thumbnail && updatedVideos[index].id) {
          updatedVideos[index].thumbnail = `https://img.youtube.com/vi/${updatedVideos[index].id}/maxresdefault.jpg`;
        }
      }

      // Handle custom category fallback
      if (field === 'category' && value !== 'Custom') {
        updatedVideos[index].customCategory = '';
      }
      
      return {
        ...prev,
        homepage: {
          ...prev.homepage,
          video_tile: {
            ...prev.homepage?.video_tile,
            videos: updatedVideos
          }
        }
      };
    });
  };

  const dragItem = useRef(null);
  const dragOverItem = useRef(null);

  const handleSortVideoLive = (draggedIndex, targetIndex) => {
    if (draggedIndex === null || targetIndex === null || draggedIndex === targetIndex) return;
    
    setContent(prev => {
      const currentVideos = [...(prev.homepage?.video_tile?.videos || DEFAULT_VIDEOS)];
      const draggedItemContent = currentVideos.splice(draggedIndex, 1)[0];
      currentVideos.splice(targetIndex, 0, draggedItemContent);
      
      dragItem.current = targetIndex;
      
      return {
        ...prev,
        homepage: {
          ...prev.homepage,
          video_tile: {
            ...prev.homepage?.video_tile,
            videos: currentVideos
          }
        }
      };
    });
  };

  const handleAddVideo = () => {
    setContent(prev => {
      const currentVideos = prev.homepage?.video_tile?.videos || DEFAULT_VIDEOS;
      const updatedVideos = [...currentVideos];
      
      updatedVideos.push({
        uniqueId: Date.now().toString(),
        id: '',
        url: '',
        category: 'Bollywood Film',
        customCategory: '',
        color: '#ef4444', // Brand Red default
        thumbnail: ''
      });
      
      setEditingVideoIndex(updatedVideos.length - 1);
      
      return {
        ...prev,
        homepage: {
          ...prev.homepage,
          video_tile: {
            ...prev.homepage?.video_tile,
            videos: updatedVideos
          }
        }
      };
    });
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const formData = new FormData();
    formData.append('image', file);
    
    try {
      const res = await fetch('http://localhost:5000/api/upload', {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      if (res.ok) {
        handleUpdateVideo(editingVideoIndex, 'thumbnail', `http://localhost:5000${data.url}`);
      } else {
        alert('Upload failed: ' + data.message);
      }
    } catch (err) {
      console.error(err);
      alert('Error uploading file');
    }
  };

  const handleEntCardUpload = async (e, index) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const formData = new FormData();
    formData.append('image', file);
    
    try {
      const res = await fetch('http://localhost:5000/api/upload', {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      if (res.ok) {
        handleUpdateHeroCard(index, 'image', `http://localhost:5000${data.url}`);
      } else {
        alert('Upload failed: ' + data.message);
      }
    } catch (err) {
      console.error(err);
      alert('Error uploading file');
    }
  };

  const handleRemoveVideo = (index) => {
    setContent(prev => {
      const currentVideos = prev.homepage?.video_tile?.videos || DEFAULT_VIDEOS;
      const updatedVideos = [...currentVideos];
      updatedVideos.splice(index, 1);
      
      return {
        ...prev,
        homepage: {
          ...prev.homepage,
          video_tile: {
            ...prev.homepage?.video_tile,
            videos: updatedVideos
          }
        }
      };
    });
  };

  
  const handleUpdateDivision = (divisionKey, field, value) => {
    setContent(prev => {
      const newState = { ...prev };
      if (!newState.homepage) newState.homepage = {};
      if (!newState.homepage.divisions) {
        newState.homepage.divisions = {
          entertainment: {
            title1: 'ENTERTAINMENT',
            title2: 'DIVISION',
            description: 'Contact us at info@redashfilms.com for end-to-end film production services and entertainment films, including',
            points: ['Theatrical Feature Films', 'Microdrama Shows', 'Music Videos', 'Web Shows', 'Short Films', 'AI Films'],
            buttonText: 'CLICK HERE',
            buttonLink: '/entertainment'
          },
          enterprise: {
            title1: 'ENTERPRISE',
            title2: 'DIVISION',
            description: 'Contact us at info@redashfilms.com for strategic ad agency services and enterprise films, including',
            points: ['Ad Films (TV, Digital & Social)', 'Corporate Films (Profile AVs)', 'Case Study Videos', 'Animated Explainers', 'AI Videos', 'Podcasts', 'Training Films', 'Testimonial Videos'],
            buttonText: 'CLICK HERE',
            buttonLink: '/ad-agency'
          }
        };
      }
      
      newState.homepage.divisions[divisionKey] = {
        ...newState.homepage.divisions[divisionKey],
        [field]: value
      };
      return newState;
    });
  };

  const handleUpdateDivisionPoint = (divisionKey, pointIndex, value) => {
    setContent(prev => {
      const newState = JSON.parse(JSON.stringify(prev));
      if (!newState.homepage?.divisions) return prev;
      newState.homepage.divisions[divisionKey].points[pointIndex] = value;
      return newState;
    });
  };

  const handleAddDivisionPoint = (divisionKey) => {
    setContent(prev => {
      const newState = JSON.parse(JSON.stringify(prev));
      if (!newState.homepage?.divisions) return prev;
      newState.homepage.divisions[divisionKey].points.push('New Point');
      return newState;
    });
  };

  const handleRemoveDivisionPoint = (divisionKey, pointIndex) => {
    setContent(prev => {
      const newState = JSON.parse(JSON.stringify(prev));
      if (!newState.homepage?.divisions) return prev;
      newState.homepage.divisions[divisionKey].points.splice(pointIndex, 1);
      return newState;
    });
  };

  const handleUpdateTopButton = (btnKey, field, value) => {
    setContent(prev => {
      const newState = JSON.parse(JSON.stringify(prev));
      if (!newState.homepage) newState.homepage = {};
      if (!newState.homepage.divisions) {
        newState.homepage.divisions = {
          entertainment: {
            title1: 'ENTERTAINMENT',
            title2: 'DIVISION',
            description: 'Contact us at info@redashfilms.com for end-to-end film production services and entertainment films, including',
            points: ['Theatrical Feature Films', 'Microdrama Shows', 'Music Videos', 'Web Shows', 'Short Films', 'AI Films'],
            buttonText: 'CLICK HERE',
            buttonLink: '/entertainment'
          },
          enterprise: {
            title1: 'ENTERPRISE',
            title2: 'DIVISION',
            description: 'Contact us at info@redashfilms.com for strategic ad agency services and enterprise films, including',
            points: ['Ad Films (TV, Digital & Social)', 'Corporate Films (Profile AVs)', 'Case Study Videos', 'Animated Explainers', 'AI Videos', 'Podcasts', 'Training Films', 'Testimonial Videos'],
            buttonText: 'CLICK HERE',
            buttonLink: '/ad-agency'
          }
        };
      }
      if (!newState.homepage.divisions.topButtons) {
        newState.homepage.divisions.topButtons = {
          entertainment: { text: 'GO TO REDASH ENTERTAINMENT FILMS', link: '/entertainment' },
          agency: { text: 'GO TO REDASH AD AGENCY', link: '/agency' }
        };
      }
      
      newState.homepage.divisions.topButtons[btnKey][field] = value;
      return newState;
    });
  };

  const handleUpdateMediaCard = (id, field, value) => {
    setContent(prev => {
      const newState = JSON.parse(JSON.stringify(prev));
      if (!newState.homepage) newState.homepage = {};
      if (!newState.homepage.mediaCards) newState.homepage.mediaCards = [];
      
      let cardIndex = newState.homepage.mediaCards.findIndex(c => c.id === id);
      
      if (cardIndex === -1) {
        const staticCard = staticMedia.find(sm => sm.id === id);
        if (staticCard) {
          newState.homepage.mediaCards.push({ ...staticCard });
          cardIndex = newState.homepage.mediaCards.length - 1;
        } else {
          return prev;
        }
      }

      if (field === 'showOnHomepage' && value === true) {
        let currentlyChecked = 0;
        staticMedia.forEach((sm, index) => {
          const override = newState.homepage.mediaCards.find(c => c.id === sm.id);
          if (override && override.showOnHomepage !== false) currentlyChecked++;
          else if (!override && index < 3) currentlyChecked++;
        });
        const dynamicChecked = newState.homepage.mediaCards.filter(c => !staticMedia.some(sm => sm.id === c.id) && c.showOnHomepage !== false).length;
        currentlyChecked += dynamicChecked;
        
        if (currentlyChecked >= 3) {
          alert("You can only select up to 3 cards to display on the homepage.");
          return prev;
        }
      }

      newState.homepage.mediaCards[cardIndex][field] = value;
      return newState;
    });
  };

  const handleAddMediaCard = () => {
    setContent(prev => {
      const newState = JSON.parse(JSON.stringify(prev));
      if (!newState.homepage) newState.homepage = {};
      if (!newState.homepage.mediaCards) newState.homepage.mediaCards = [];
      newState.homepage.mediaCards.push({
        id: Date.now().toString(),
        source: '',
        title: '',
        description: '',
        url: '',
        image: '',
        showOnHomepage: true
      });
      return newState;
    });
  };

  const defaultFeaturedCelebs = {
    row1: [
      { name: 'Ashish Lal', img: celeb1 },
      { name: 'Surbhi Jyoti', img: celeb2 },
      { name: 'Upendra Limaye', img: celeb3 },
      { name: 'Vidya Malavade', img: celeb4 },
      { name: 'Zakir Hussain', img: celeb5 },
      { name: 'Navni Parihar', img: celeb6 },
      { name: 'Durgesh Kumar', img: celeb7 },
      { name: 'Pariva Pranati', img: celeb8 },
      { name: 'Tom Alter', img: celeb9 }
    ],
    row2: [
      { name: 'Seema Biswas', img: celeb10 },
      { name: 'Kiran Kumar', img: celeb11 },
      { name: 'Nibeditaa Paal', img: celeb12 },
      { name: 'Piyush Sahdev', img: celeb13 }
    ]
  };

  const handleUpdateCeleb = (rowKey, index, field, value) => {
    setContent(prev => {
      const newState = JSON.parse(JSON.stringify(prev));
      if (!newState.entertainment) newState.entertainment = {};
      if (!newState.entertainment.featuredCelebs) {
        newState.entertainment.featuredCelebs = JSON.parse(JSON.stringify(defaultFeaturedCelebs));
      }
      if (newState.entertainment.featuredCelebs[rowKey]?.[index]) {
        newState.entertainment.featuredCelebs[rowKey][index][field] = value;
      }
      return newState;
    });
  };

  const handleAddCeleb = (rowKey) => {
    setContent(prev => {
      const newState = JSON.parse(JSON.stringify(prev));
      if (!newState.entertainment) newState.entertainment = {};
      if (!newState.entertainment.featuredCelebs) {
        newState.entertainment.featuredCelebs = JSON.parse(JSON.stringify(defaultFeaturedCelebs));
      }
      if (!newState.entertainment.featuredCelebs[rowKey]) {
        newState.entertainment.featuredCelebs[rowKey] = [];
      }
      newState.entertainment.featuredCelebs[rowKey].push({ name: '', img: '' });
      return newState;
    });
  };

  const handleRemoveCeleb = (rowKey, index) => {
    setContent(prev => {
      const newState = JSON.parse(JSON.stringify(prev));
      if (!newState.entertainment) newState.entertainment = {};
      if (!newState.entertainment.featuredCelebs) {
        newState.entertainment.featuredCelebs = JSON.parse(JSON.stringify(defaultFeaturedCelebs));
      }
      if (newState.entertainment.featuredCelebs[rowKey]) {
        newState.entertainment.featuredCelebs[rowKey].splice(index, 1);
      }
      return newState;
    });
  };

  const handleCelebFileUpload = (e, rowKey, index) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleUpdateCeleb(rowKey, index, 'img', reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveMediaCard = (id) => {
    const isStatic = staticMedia.some(sm => sm.id === id);
    if (isStatic) {
      alert("This is a built-in static media card. You cannot delete it, but you can hide it from the homepage by unchecking the box.");
      return;
    }
    
    if (window.confirm('Are you sure you want to delete this media card?')) {
      setContent(prev => {
        const newState = JSON.parse(JSON.stringify(prev));
        if (newState.homepage?.mediaCards) {
          const idx = newState.homepage.mediaCards.findIndex(c => c.id === id);
          if (idx !== -1) {
            newState.homepage.mediaCards.splice(idx, 1);
          }
        }
        return newState;
      });
    }
  };

  const getPreviewUrl = () => {
    switch (activeSidebar) {
      case 'homepage': return 'http://localhost:5173/';
      case 'entertainment': return 'http://localhost:5173/entertainment';
      case 'agency': return 'http://localhost:5173/ad-agency';
      default: return 'http://localhost:5173/';
    }
  };

  const renderSubMenu = () => {
    switch (activeSidebar) {
      case 'homepage':
        return (
          <>
            <div className="section-header">
              <h1>Homepage Sections</h1>
              <p>Update all homepage text content</p>
            </div>
            <div className="sub-nav">
              <button className={`sub-nav-item ${activeSubMenu === 'logo' ? 'active' : ''}`} onClick={() => setActiveSubMenu('logo')}>
                <div className="label-group"><Layout size={16} /> Upload Logo</div>
              </button>
              <button className={`sub-nav-item ${activeSubMenu === 'hero' ? 'active' : ''}`} onClick={() => setActiveSubMenu('hero')}>
                <div className="label-group"><Layout size={16} /> Hero Section</div>
                <div className="status-dot"></div>
              </button>
              <button className={`sub-nav-item ${activeSubMenu === 'video_tile' ? 'active' : ''}`} onClick={() => setActiveSubMenu('video_tile')}>
                <div className="label-group"><Layout size={16} /> Video Tile</div>
              </button>
              <button className={`sub-nav-item ${activeSubMenu === 'divisions' ? 'active' : ''}`} onClick={() => setActiveSubMenu('divisions')}>
                <div className="label-group"><Layout size={16} /> Divisions</div>
              </button>
              <button className={`sub-nav-item ${activeSubMenu === 'quotation' ? 'active' : ''}`} onClick={() => setActiveSubMenu('quotation')}>
                <div className="label-group"><Layout size={16} /> Quotation Form</div>
              </button>

            </div>
          </>
        );
      case 'entertainment':
        return (
          <>
            <div className="section-header">
              <h1>Entertainment Homepage</h1>
              <p>Update content of the homepage</p>
            </div>
            <div className="sub-nav">
              <button className={`sub-nav-item ${activeSubMenu === 'logo' ? 'active' : ''}`} onClick={() => setActiveSubMenu('logo')}>
                <div className="label-group"><Layout size={16} /> Logo</div>
              </button>
              <button className={`sub-nav-item ${activeSubMenu === 'navigation' ? 'active' : ''}`} onClick={() => setActiveSubMenu('navigation')}>
                <div className="label-group"><Layout size={16} /> Navigation Menu</div>
              </button>
              <button className={`sub-nav-item ${activeSubMenu === 'hero' ? 'active' : ''}`} onClick={() => setActiveSubMenu('hero')}>
                <div className="label-group"><Layout size={16} /> Hero Section</div>
              </button>
              <button className={`sub-nav-item ${activeSubMenu === 'hero_cards' ? 'active' : ''}`} onClick={() => setActiveSubMenu('hero_cards')}>
                <div className="label-group"><Layout size={16} /> Hero Cards</div>
              </button>
              <button className={`sub-nav-item ${activeSubMenu === 'quotation' ? 'active' : ''}`} onClick={() => setActiveSubMenu('quotation')}>
                <div className="label-group"><Layout size={16} /> Quotation Form</div>
              </button>
              <button className={`sub-nav-item ${activeSubMenu === 'featured_celebs' ? 'active' : ''}`} onClick={() => setActiveSubMenu('featured_celebs')}>
                <div className="label-group"><Users size={16} /> Featured Celebrities</div>
              </button>
              <button className={`sub-nav-item ${activeSubMenu === 'clients' ? 'active' : ''}`} onClick={() => setActiveSubMenu('clients')}>
                <div className="label-group"><ImageIcon size={16} /> Entertainment Partners</div>
              </button>
              <button className={`sub-nav-item ${activeSubMenu === 'red_hot' ? 'active' : ''}`} onClick={() => setActiveSubMenu('red_hot')}>
                <div className="label-group"><Flame size={16} /> What's Red Hot</div>
              </button>
              <button className={`sub-nav-item ${activeSubMenu === 'projects' ? 'active' : ''}`} onClick={() => setActiveSubMenu('projects')}>
                <div className="label-group"><Film size={16} /> Entertainment Projects</div>
              </button>
            </div>
          </>
        );
      case 'entertainment-about':
        return (
          <>
            <div className="section-header">
              <h1>Entertainment About</h1>
              <p>Update content for the About page</p>
            </div>
            <div className="sub-nav">
              <button className={`sub-nav-item ${activeSubMenu === 'aboutHero' ? 'active' : ''}`} onClick={() => setActiveSubMenu('aboutHero')}>
                <div className="label-group"><Layout size={16} /> Hero Section</div>
              </button>
              <button className={`sub-nav-item ${activeSubMenu === 'aboutStory' ? 'active' : ''}`} onClick={() => setActiveSubMenu('aboutStory')}>
                <div className="label-group"><Layout size={16} /> Our Story</div>
              </button>
              <button className={`sub-nav-item ${activeSubMenu === 'aboutVision' ? 'active' : ''}`} onClick={() => setActiveSubMenu('aboutVision')}>
                <div className="label-group"><Layout size={16} /> Vision & Process</div>
              </button>
              <button className={`sub-nav-item ${activeSubMenu === 'aboutInvestors' ? 'active' : ''}`} onClick={() => setActiveSubMenu('aboutInvestors')}>
                <div className="label-group"><Layout size={16} /> Investors Section</div>
              </button>
            </div>
          </>
        );
      case 'entertainment-films':
        return (
          <>
            <div className="section-header">
              <h1>Entertainment Films</h1>
              <p>Update content for the Films page</p>
            </div>
            <div className="sub-nav">
              <button className={`sub-nav-item ${activeSubMenu === 'filmsHero' ? 'active' : ''}`} onClick={() => setActiveSubMenu('filmsHero')}>
                <div className="label-group"><Layout size={16} /> Hero Section</div>
              </button>
              <button className={`sub-nav-item ${activeSubMenu === 'filmsProcess' ? 'active' : ''}`} onClick={() => setActiveSubMenu('filmsProcess')}>
                <div className="label-group"><Layout size={16} /> Process Timeline</div>
              </button>
              <button className={`sub-nav-item ${activeSubMenu === 'filmsTalent' ? 'active' : ''}`} onClick={() => setActiveSubMenu('filmsTalent')}>
                <div className="label-group"><Layout size={16} /> Talent Showcase</div>
              </button>
            </div>
          </>
        );
      case 'entertainment-media':
        return (
          <>
            <div className="section-header">
              <h1>Media Coverage</h1>
              <p>Manage media articles and statement</p>
            </div>
            <div className="sub-nav">
              <button className={`sub-nav-item ${activeSubMenu === 'media' ? 'active' : ''}`} onClick={() => setActiveSubMenu('media')}>
                <div className="label-group"><FileText size={16} /> Media Settings</div>
              </button>
            </div>
          </>
        );
      case 'entertainment-contact':
        return (
          <>
            <div className="section-header">
              <h1>Entertainment Contact</h1>
              <p>Manage the contact section for the Entertainment page</p>
            </div>
            <div className="sub-nav">
              <button className={`sub-nav-item ${activeSubMenu === 'contact' ? 'active' : ''}`} onClick={() => setActiveSubMenu('contact')}>
                <div className="label-group"><FileText size={16} /> Contact Subtext</div>
              </button>
            </div>
          </>
        );
      case 'entertainment-blog':
        return (
          <>
            <div className="section-header">
              <h1>Entertainment Blog</h1>
              <p>Manage blog posts and articles</p>
            </div>
            <div className="sub-nav">
              <button className={`sub-nav-item ${activeSubMenu === 'blog' ? 'active' : ''}`} onClick={() => setActiveSubMenu('blog')}>
                <div className="label-group"><FileText size={16} /> Blog Posts</div>
              </button>
            </div>
          </>
        );
      case 'shared':
        return (
          <>
            <div className="section-header">
              <h1>Shared Content</h1>
              <p>Manage content shared across sites</p>
            </div>
            <div className="sub-nav">
              <button className={`sub-nav-item ${activeSubMenu === 'navigation' ? 'active' : ''}`} onClick={() => setActiveSubMenu('navigation')}>
                <div className="label-group"><Layout size={16} /> Navigation Menu</div>
              </button>
              <button className="sub-nav-item">
                <div className="label-group"><Layout size={16} /> Common Buttons</div>
              </button>

            </div>
          </>
        );
      case 'global-contact':
        return (
          <div className="section-header">
            <h1>Global Contact Info</h1>
            <p>Manage contact info shown across the site</p>
          </div>
        );
      case 'global-contact':
        return (
          <div className="section-header">
            <h1>Global Contact Info</h1>
            <p>Manage contact info shown across the site</p>
          </div>
        );
      case 'homepage-media':
        return (
          <div className="section-header">
            <h1>Media Cards</h1>
            <p>Manage the news and press cards</p>
          </div>
        );
      default:
        return (
          <div className="section-header">
            <h1>Select a Section</h1>
          </div>
        );
    }
  };

  const renderEditor = () => {
    if (activeSidebar === 'global-contact') {
      const contactInfo = content.global?.contact || {
        addressTitle: 'RedAsh, 1101, Peninsula Park',
        addressDesc: 'Fun Republic Lane, Near Yash Raj Studios, Andheri West, Mumbai 400053',
        mapLinkUrl: 'https://share.google/Pxp4Tva4m3IyfrKAd',
        mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3769.754702008323!2d72.83299317593922!3d19.118432350639912!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c9d90e067ba9%3A0x16268e5d6bbc70d9!2sPeninsula%20Park!5e0!3m2!1sen!2sin!4v1716388437021!5m2!1sen!2sin',
        email1: 'info@redashfilms.com',
        email1Subtitle: 'Potential Clients, Investors, and Sponsors can email or fill the form below',
        email2: 'redash.films@gmail.com',
        email2Subtitle: 'For Actors, Film Crew Members & Vendors - only email'
      };

      const handleChange = (field, value) => {
        setContent(prev => {
          const newState = JSON.parse(JSON.stringify(prev));
          if (!newState.global) newState.global = {};
          if (!newState.global.contact) newState.global.contact = { ...contactInfo };
          newState.global.contact[field] = value;
          return newState;
        });
      };

      return (
        <div className="editor-form-pane">
          <div className="form-header">
            <div>
              <h2>Global Contact Info</h2>
              <p>This information is used on the Entertainment and Ad Agency contact pages.</p>
            </div>
          </div>
          
          <div className="content-block-panel">
            <h3 style={{ marginBottom: '1rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.5rem' }}>Office Address</h3>
            <div className="form-group">
              <label>Address Title</label>
              <input type="text" className="form-control" value={contactInfo.addressTitle || ''} onChange={(e) => handleChange('addressTitle', e.target.value)} />
            </div>
            <div className="form-group" style={{ marginTop: '1rem' }}>
              <label>Address Description</label>
              <textarea className="form-control" rows="2" value={contactInfo.addressDesc || ''} onChange={(e) => handleChange('addressDesc', e.target.value)} />
            </div>
            <div className="form-group" style={{ marginTop: '1rem' }}>
              <label>Google Maps Link URL (click link)</label>
              <input type="text" className="form-control" value={contactInfo.mapLinkUrl || ''} onChange={(e) => handleChange('mapLinkUrl', e.target.value)} />
            </div>
          </div>

          <div className="content-block-panel" style={{ marginTop: '2rem' }}>
            <h3 style={{ marginBottom: '1rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.5rem' }}>Primary Email</h3>
            <div className="form-group">
              <label>Email Address</label>
              <input type="text" className="form-control" value={contactInfo.email1 || ''} onChange={(e) => handleChange('email1', e.target.value)} />
            </div>
            <div className="form-group" style={{ marginTop: '1rem' }}>
              <label>Subtitle / Description</label>
              <input type="text" className="form-control" value={contactInfo.email1Subtitle || ''} onChange={(e) => handleChange('email1Subtitle', e.target.value)} />
            </div>
          </div>

          <div className="content-block-panel" style={{ marginTop: '2rem' }}>
            <h3 style={{ marginBottom: '1rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.5rem' }}>Secondary Email</h3>
            <div className="form-group">
              <label>Email Address</label>
              <input type="text" className="form-control" value={contactInfo.email2 || ''} onChange={(e) => handleChange('email2', e.target.value)} />
            </div>
            <div className="form-group" style={{ marginTop: '1rem' }}>
              <label>Subtitle / Description</label>
              <input type="text" className="form-control" value={contactInfo.email2Subtitle || ''} onChange={(e) => handleChange('email2Subtitle', e.target.value)} />
            </div>
          </div>
          
          <div className="content-block-panel" style={{ marginTop: '2rem' }}>
            <h3 style={{ marginBottom: '1rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.5rem' }}>Map Embed</h3>
            <div className="form-group">
              <label>Google Maps Embed URL (iframe src)</label>
              <input type="text" className="form-control" value={contactInfo.mapEmbedUrl || ''} onChange={(e) => handleChange('mapEmbedUrl', e.target.value)} />
            </div>
            {contactInfo.mapEmbedUrl && (
              <div style={{ marginTop: '1rem', width: '100%', height: '300px', borderRadius: '8px', overflow: 'hidden', border: '1px solid #e2e8f0' }}>
                <iframe 
                  src={contactInfo.mapEmbedUrl}
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen="" 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Location Preview"
                ></iframe>
              </div>
            )}
          </div>
          
          <div style={{ marginTop: '2.5rem', paddingTop: '1.5rem', borderTop: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
            <label style={{ fontSize: '0.95rem', fontWeight: '600', color: '#334155', textAlign: 'center' }}>Save Contact Info</label>
            <button type="button" className="btn-primary" onClick={() => handleSave(content)} style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', background: '#e20002', color: '#fff', border: 'none', padding: '0.6rem 2.5rem', borderRadius: '6px', fontWeight: '600', fontSize: '0.95rem', cursor: 'pointer', boxShadow: '0 4px 6px -1px rgba(226, 0, 2, 0.2), 0 2px 4px -1px rgba(226, 0, 2, 0.1)' }}>
              <Save size={16} /> Save Changes
            </button>
          </div>
        </div>
      );
    }
    if (activeSidebar === 'homepage' && activeSubMenu === 'hero') {
      const data = content.homepage?.hero || { heading_blocks: [] };
      
      // Fallback to legacy fields if heading_blocks array doesn't exist yet
      const blocks = data.heading_blocks || [
        { id: 1, text: 'FILM', subtext: 'PRODUCTION HOUSE', bg_image: '', subtext_color: '#ef4444' },
        { id: 2, text: '&', subtext: '', bg_image: '', subtext_color: '#ef4444' },
        { id: 3, text: 'AD', subtext: 'AGENCY', bg_image: '', subtext_color: '#3b82f6' },
        { id: 4, text: '2007', subtext: "IIT ENGINEER'S VENTURE", bg_image: '', subtext_color: '#6b7280' }
      ];

      return (
        <div className="editor-form-pane">
          <div className="form-header">
            <div>
              <h2>Dynamic Hero Section</h2>
              <p>Add and manage headings with optional background images</p>
            </div>
          </div>
          
          <div className="blocks-container">
            {blocks.map((block, index) => (
              <div key={block.id} className="content-block-panel">
                <div className="block-header">
                  <span className="block-title">Heading Block {index + 1}</span>
                  <button className="btn-icon text-red" onClick={() => handleRemoveBlock(index)} title="Delete Block">
                    <Trash2 size={16} />
                  </button>
                </div>
                
                <div className="form-group">
                  <label>Heading Text</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    value={block.text || ''}
                    onChange={(e) => handleUpdateBlock(index, 'text', e.target.value)}
                    placeholder="e.g. FILM PRODUCTION HOUSE"
                  />
                </div>
                <div className="form-group">
                  <label>Subtext (Optional)</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    value={block.subtext || ''}
                    onChange={(e) => handleUpdateBlock(index, 'subtext', e.target.value)}
                    placeholder="e.g. IIT ENGINEER'S VENTURE"
                  />
                </div>
                <div className="form-group">
                  <label>Background Image URL (Optional)</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    value={block.bg_image || ''}
                    onChange={(e) => handleUpdateBlock(index, 'bg_image', e.target.value)}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
                <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                  <div className="form-group" style={{ flex: 1, marginBottom: 0 }}>
                    <label>Subtext Color</label>
                    <select 
                      className="form-control custom-select" 
                      style={{ padding: '0.8rem 1rem', height: 'auto', cursor: 'pointer' }}
                      value={block.subtext_color || '#ef4444'}
                      onChange={(e) => handleUpdateBlock(index, 'subtext_color', e.target.value)}
                    >
                      <option value="#ef4444">Brand Red</option>
                      <option value="#6b7280">Brand Gray</option>
                      <option value="#3b82f6">Brand Blue</option>
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </div>



          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end' }}>
            <button className="btn-primary" onClick={handleSave}>
              <Save size={16} /> Save Section Changes
            </button>
          </div>
        </div>
      );
    }
    
    if (activeSidebar === 'homepage' && activeSubMenu === 'video_tile') {
      const videoData = content.homepage?.video_tile?.videos || DEFAULT_VIDEOS;

      if (editingVideoIndex !== null && videoData.length > 0) {
        const video = videoData[editingVideoIndex];
        if (!video) {
          setEditingVideoIndex(null);
          return null;
        }

        return (
          <div className="editor-form-pane">
            <div className="form-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h2>Edit Video</h2>
                <p>Configure video tile properties</p>
              </div>
              <button className="btn-secondary" onClick={() => setEditingVideoIndex(null)}>
                Back to List
              </button>
            </div>
            
            <div className="content-block-panel">
              <div className="form-group">
                <label>YouTube Video URL </label>
                <input 
                  type="text" 
                  className="form-control" 
                  value={video.url || ''}
                  onChange={(e) => handleUpdateVideo(editingVideoIndex, 'url', e.target.value)}
                  placeholder="Enter youtube or article url here"
                />
                {video.id && (
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                    Extracted ID: {video.id}
                  </p>
                )}
              </div>

              <div className="form-group">
                <label>Thumbnail Image</label>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <input 
                    type="text" 
                    className="form-control" 
                    style={{ flex: 1 }}
                    value={video.thumbnail || ''}
                    onChange={(e) => handleUpdateVideo(editingVideoIndex, 'thumbnail', e.target.value)}
                    placeholder="Auto-fetches from YouTube if empty, or paste a URL"
                  />
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>OR</span>
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={handleFileUpload}
                    style={{ display: 'none' }}
                    id="thumbnail-upload"
                  />
                  <label htmlFor="thumbnail-upload" className="btn-secondary" style={{ cursor: 'pointer', margin: 0, padding: '0.6rem 1rem' }}>
                    Upload File
                  </label>
                </div>
              </div>

              <div className="form-group">
                <label>Division</label>
                <select 
                  className="form-control custom-select" 
                  style={{ padding: '0.8rem 1rem', height: 'auto', cursor: 'pointer' }}
                  value={video.category || 'Bollywood Film'}
                  onChange={(e) => handleUpdateVideo(editingVideoIndex, 'category', e.target.value)}
                >
                  <option value="Bollywood Film">Bollywood Film</option>
                  <option value="TV Ad">TV Ad</option>
                  <option value="Web Series">Web Series</option>
                  <option value="Digital Ad Film">Digital Ad Film</option>
                  <option value="Custom">Custom (Type your own)</option>
                </select>
              </div>

              {video.category === 'Custom' && (
                <div className="form-group">
                  <label>Custom Division Name</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    value={video.customCategory || ''}
                    onChange={(e) => handleUpdateVideo(editingVideoIndex, 'customCategory', e.target.value)}
                    placeholder="e.g. Documentary"
                  />
                </div>
              )}

              <div className="form-group">
                <label>Tile Brand Color</label>
                <select 
                  className="form-control custom-select" 
                  style={{ padding: '0.8rem 1rem', height: 'auto', cursor: 'pointer' }}
                  value={video.color || '#ef4444'}
                  onChange={(e) => handleUpdateVideo(editingVideoIndex, 'color', e.target.value)}
                >
                  <option value="#ef4444">Brand Red</option>
                  <option value="#3b82f6">Brand Blue</option>
                </select>
              </div>
            </div>

            <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
              <button className="btn-secondary" onClick={() => setEditingVideoIndex(null)}>
                Done Editing
              </button>
              <button className="btn-primary" onClick={handleSave}>
                <Save size={16} /> Save Changes
              </button>
            </div>
          </div>
        );
      }

      // List View
      return (
        <div 
          className="editor-form-pane"
          onDragOver={(e) => {
            const container = e.currentTarget;
            const threshold = 100;
            const speed = 15;
            const { top, bottom } = container.getBoundingClientRect();
            const y = e.clientY;
            if (y - top < threshold) {
              container.scrollTop -= speed;
            } else if (bottom - y < threshold) {
              container.scrollTop += speed;
            }
          }}
        >
          <div className="form-header">
            <div>
              <h2>Video Tile Section</h2>
              <p>Manage the videos displayed on the homepage grid</p>
            </div>
          </div>
          
          <div className="blocks-container" style={videoData.length > 0 ? { display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '1rem' } : {}}>
            {videoData.length === 0 ? (
              <div className="info-note mt-4 text-center">
                <p>No videos added yet. Click below to add your first video.</p>
              </div>
            ) : (
              videoData.map((video, index) => (
                <div 
                  key={video.uniqueId || index} 
                  className="content-block-panel" 
                  style={{ display: 'flex', flexDirection: 'column', padding: '0', cursor: 'move', position: 'relative', overflow: 'hidden', height: '100%' }}
                  draggable
                  onDragStart={(e) => {
                    dragItem.current = index;
                    e.dataTransfer.effectAllowed = 'move';
                    e.dataTransfer.setData('text/plain', index.toString());
                  }}
                  onDragEnter={(e) => { 
                    e.preventDefault();
                    if (dragItem.current !== null && dragItem.current !== index) {
                      handleSortVideoLive(dragItem.current, index);
                    }
                  }}
                  onDragOver={(e) => { 
                    e.preventDefault(); 
                  }}
                  onDrop={(e) => {
                    e.preventDefault();
                    dragItem.current = null;
                  }}
                >
                  <div style={{ position: 'absolute', top: '0.5rem', left: '0.5rem', color: '#111827', cursor: 'grab', zIndex: 10, background: 'rgba(255,255,255,0.8)', borderRadius: '4px', padding: '2px' }}>
                    <GripVertical size={16} />
                  </div>
                  
                  <div style={{ width: '100%', aspectRatio: '16/9', backgroundColor: '#000', overflow: 'hidden', backgroundImage: `url(${video.thumbnail || `https://img.youtube.com/vi/${video.id}/mqdefault.jpg`})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                    {!video.id && !video.thumbnail && <div style={{width:'100%', height:'100%', display:'flex', alignItems:'center', justifyContent:'center', color:'#555'}}><PlayCircle size={20}/></div>}
                  </div>
                  
                  <div style={{ flex: 1, minWidth: 0, width: '100%', display: 'flex', flexDirection: 'column', padding: '0.8rem' }}>
                    <div style={{ fontWeight: 600, fontSize: '0.85rem', color: 'var(--text-main)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginBottom: '0.2rem' }}>
                      {video.category === 'Custom' ? video.customCategory : video.category}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      <span style={{ color: video.color }}>{video.color === '#ef4444' ? 'Red' : 'Blue'} Theme</span>
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', gap: '0.5rem', width: '100%', justifyContent: 'flex-end', marginTop: 'auto', padding: '0 0.8rem 0.8rem 0.8rem' }}>
                    <button className="btn-icon" onClick={() => setEditingVideoIndex(index)} title="Edit Video">
                      <Edit2 size={14} />
                    </button>
                    <button className="btn-icon text-red" onClick={() => handleRemoveVideo(index)} title="Delete Video">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          <button className="btn-outline-dashed mt-4" onClick={handleAddVideo}>
            <Plus size={16} /> Add New Video
          </button>
          
          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end' }}>
            <button className="btn-primary" onClick={handleSave}>
              <Save size={16} /> Save Section Changes
            </button>
          </div>
        </div>
      );
    }
    
    
    if (activeSidebar === 'homepage' && activeSubMenu === 'divisions') {
      const divisions = content.homepage?.divisions || {
        entertainment: {
          title1: 'ENTERTAINMENT',
          title2: 'DIVISION',
          description: 'Contact us at info@redashfilms.com for end-to-end film production services and entertainment films, including',
          points: ['Theatrical Feature Films', 'Microdrama Shows', 'Music Videos', 'Web Shows', 'Short Films', 'AI Films'],
          buttonText: 'CLICK HERE',
          buttonLink: '/entertainment'
        },
        enterprise: {
          title1: 'ENTERPRISE',
          title2: 'DIVISION',
          description: 'Contact us at info@redashfilms.com for strategic ad agency services and enterprise films, including',
          points: ['Ad Films (TV, Digital & Social)', 'Corporate Films (Profile AVs)', 'Case Study Videos', 'Animated Explainers', 'AI Videos', 'Podcasts', 'Training Films', 'Testimonial Videos'],
          buttonText: 'CLICK HERE',
          buttonLink: '/ad-agency'
        },
        topButtons: {
          entertainment: { text: 'GO TO REDASH ENTERTAINMENT FILMS', link: '/entertainment' },
          agency: { text: 'GO TO REDASH AD AGENCY', link: '/agency' }
        }
      };

      const topButtons = divisions.topButtons || {
        entertainment: { text: 'GO TO REDASH ENTERTAINMENT FILMS', link: '/entertainment' },
        agency: { text: 'GO TO REDASH AD AGENCY', link: '/agency' }
      };

      return (
        <div className="editor-form-pane">
          <div className="form-header">
            <div>
              <h2>Divisions Section</h2>
              <p>Manage the two main division cards and their points.</p>
            </div>
          </div>

          <div className="content-block-panel mb-6">
            <div className="block-header">
              <span className="block-title">Top Section Navigation Buttons</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
              <div>
                <label className="text-muted" style={{fontSize: '0.8rem', display: 'block', marginBottom: '0.5rem'}}>Entertainment Button Text</label>
                <input type="text" className="form-control" value={topButtons.entertainment.text} onChange={(e) => handleUpdateTopButton('entertainment', 'text', e.target.value)} />
                <label className="text-muted mt-4" style={{fontSize: '0.8rem', display: 'block', marginBottom: '0.5rem'}}>Entertainment Button Link</label>
                <input type="text" className="form-control" value={topButtons.entertainment.link} onChange={(e) => handleUpdateTopButton('entertainment', 'link', e.target.value)} />
              </div>
              <div>
                <label className="text-muted" style={{fontSize: '0.8rem', display: 'block', marginBottom: '0.5rem'}}>Ad Agency Button Text</label>
                <input type="text" className="form-control" value={topButtons.agency.text} onChange={(e) => handleUpdateTopButton('agency', 'text', e.target.value)} />
                <label className="text-muted mt-4" style={{fontSize: '0.8rem', display: 'block', marginBottom: '0.5rem'}}>Ad Agency Button Link</label>
                <input type="text" className="form-control" value={topButtons.agency.link} onChange={(e) => handleUpdateTopButton('agency', 'link', e.target.value)} />
              </div>
            </div>
          </div>
          <div className="blocks-container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', alignItems: 'start' }}>
            {['entertainment', 'enterprise'].map((divKey) => {
              const divData = divisions[divKey];
              return (
                <div key={divKey} className="content-block-panel">
                  <div className="block-header">
                    <span className="block-title capitalize">{divKey} Division</span>
                  </div>
                  
                  <div className="form-group">
                    <label>Title Line 1</label>
                    <input type="text" className="form-control" value={divData.title1} onChange={(e) => handleUpdateDivision(divKey, 'title1', e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label>Title Line 2</label>
                    <input type="text" className="form-control" value={divData.title2} onChange={(e) => handleUpdateDivision(divKey, 'title2', e.target.value)} />
                  </div>

                  
                  <div className="form-group mt-4">
                    <label>Points</label>
                    {divData.points.map((pt, i) => (
                      <div key={i} style={{display: 'flex', gap: '0.5rem', marginBottom: '0.5rem'}}>
                        <input type="text" className="form-control" value={pt} onChange={(e) => handleUpdateDivisionPoint(divKey, i, e.target.value)} />
                        <button className="btn-icon text-red" onClick={() => handleRemoveDivisionPoint(divKey, i)}><Trash2 size={16}/></button>
                      </div>
                    ))}
                    <button className="btn-secondary mt-2" onClick={() => handleAddDivisionPoint(divKey)}>
                      <Plus size={14} /> Add Point
                    </button>
                  </div>

                  <div className="form-group mt-4">
                    <label>Button Text</label>
                    <input type="text" className="form-control" value={divData.buttonText} onChange={(e) => handleUpdateDivision(divKey, 'buttonText', e.target.value)} />
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end' }}>
            <button className="btn-primary" onClick={handleSave}>
              <Save size={16} /> Save Section Changes
            </button>
          </div>
        </div>
      );
    }

    if ((activeSidebar === 'homepage' || activeSidebar === 'entertainment' || activeSidebar === 'agency' || activeSidebar === 'shared') && activeSubMenu === 'quotation') {
      let defaultText1 = 'Potential clients can fill this form or email us at';
      if (activeSidebar === 'entertainment') {
        defaultText1 = 'Potential investors/sponsors can fill this form or email us at';
      } else if (activeSidebar === 'agency') {
        defaultText1 = 'Brands and Corporates can fill this form or email us at';
      }

      const quotation = {
        text1: defaultText1,
        email1: 'info@redashfilms.com',
        text2: 'Actors, Film Crew Members & Vendors can email their profiles only at',
        email2: 'redash.films@gmail.com',
        officeText: 'RedAsh Office:',
        officeAddress: '1101, Peninsula Park, Fun Republic Lane, Andheri West, Mumbai, 400053',
        mapLinkText: '(Google Location)',
        mapLinkUrl: 'https://share.google/Pxp4Tva4m3IyfrKAd',
        ...(content[activeSidebar]?.quotation || {})
      };

      return (
        <div className="editor-form-pane">
          <div className="form-header">
            <div>
              <h2>Quotation Form Section</h2>
              <p>Manage the footer texts below the quotation form.</p>
            </div>
          </div>

          <div className="content-block-panel mb-6">
            <div className="block-header">
              <span className="block-title">Client Contact Text</span>
            </div>
            <div className="form-group">
              <label>Text 1</label>
              <input type="text" className="form-control" value={quotation.text1} onChange={(e) => handleUpdate('quotation', 'text1', e.target.value)} />
            </div>
            <div className="form-group mt-4">
              <label>Email 1</label>
              <input type="text" className="form-control" value={quotation.email1} onChange={(e) => handleUpdate('quotation', 'email1', e.target.value)} />
            </div>
          </div>

          <div className="content-block-panel mb-6">
            <div className="block-header">
              <span className="block-title">Crew/Vendor Contact Text</span>
            </div>
            <div className="form-group">
              <label>Text 2</label>
              <input type="text" className="form-control" value={quotation.text2} onChange={(e) => handleUpdate('quotation', 'text2', e.target.value)} />
            </div>
            <div className="form-group mt-4">
              <label>Email 2</label>
              <input type="text" className="form-control" value={quotation.email2} onChange={(e) => handleUpdate('quotation', 'email2', e.target.value)} />
            </div>
          </div>

          <div className="content-block-panel">
            <div className="block-header">
              <span className="block-title">Office Location Text</span>
            </div>
            <div className="form-group">
              <label>Office Prefix</label>
              <input type="text" className="form-control" value={quotation.officeText} onChange={(e) => handleUpdate('quotation', 'officeText', e.target.value)} />
            </div>
            <div className="form-group mt-4">
              <label>Office Address</label>
              <input type="text" className="form-control" value={quotation.officeAddress} onChange={(e) => handleUpdate('quotation', 'officeAddress', e.target.value)} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginTop: '1rem' }}>
              <div className="form-group">
                <label>Map Link Text</label>
                <input type="text" className="form-control" value={quotation.mapLinkText} onChange={(e) => handleUpdate('quotation', 'mapLinkText', e.target.value)} />
              </div>
              <div className="form-group">
                <label>Map Link URL</label>
                <input type="text" className="form-control" value={quotation.mapLinkUrl} onChange={(e) => handleUpdate('quotation', 'mapLinkUrl', e.target.value)} />
              </div>
            </div>
          </div>

          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end' }}>
            <button className="btn-primary" onClick={handleSave}>
              <Save size={16} /> Save Section Changes
            </button>
          </div>
        </div>
      );
    }

    if (activeSidebar === 'homepage' && activeSubMenu === 'logo') {
      const logo = content.homepage?.logo || { url: '' };

      const handleLogoUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
            handleUpdate('logo', 'url', reader.result);
          };
          reader.readAsDataURL(file);
        }
      };

      return (
        <div className="editor-form-pane">
          <div className="form-header">
            <div>
              <h2>Upload Logo</h2>
              <p>Change the main logo for the website.</p>
              
              <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: '#eff6ff', borderLeft: '4px solid #3b82f6', borderRadius: '4px' }}>
                <h4 style={{ color: '#1e40af', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.9rem' }}>Logo Requirements & Recommendations</h4>
                <ul style={{ fontSize: '0.85rem', color: '#334155', listStyleType: 'disc', paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                  <li><strong>Format:</strong> Use a <span className="font-bold">transparent WebP or PNG (no background)</span> for best results. We highly recommend WebP!</li>
                  <li><strong>Dimensions:</strong> The website automatically scales any uploaded logo to fit the navigation bar perfectly. Any dimension (like your original <strong>3782x4347</strong> logo) is fully accepted and will maintain its correct aspect ratio!</li>
                  <li><strong>Orientation:</strong> Both horizontal and vertical/square logos are fully supported.</li>
                  <li><strong>File Size:</strong> Please keep your file under <span className="font-bold">500KB</span> for fast loading speeds.</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="content-block-panel mt-6">
            <div className="block-header">
              <span className="block-title">Website Logo</span>
            </div>
            
            <div className="form-group">
              <label>Current Logo Preview</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <div style={{ padding: '1rem', background: '#ffffff', borderRadius: '4px', border: '1px solid #e2e8f0', display: 'inline-block' }}>
                  {logo.url ? (
                    <img src={logo.url} alt="Logo Preview" style={{ maxHeight: '60px', objectFit: 'contain' }} />
                  ) : (
                    <span className="text-muted">No logo uploaded yet</span>
                  )}
                </div>
                {logo.url && (
                  <button className="btn-icon text-red" onClick={() => handleUpdate('logo', 'url', '')} title="Remove Logo">
                    <Trash2 size={18} /> Remove Logo
                  </button>
                )}
              </div>
            </div>
            
            <div className="form-group">
              <label>Upload New Logo Image</label>
              <input type="file" className="form-control" accept="image/*" onChange={handleLogoUpload} />
            </div>
          </div>
          
          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end' }}>
            <button className="btn-primary" onClick={handleSave}>
              <Save size={16} /> Save Section Changes
            </button>
          </div>
        </div>
      );
    }

    if (activeSidebar === 'entertainment' && activeSubMenu === 'logo') {
      const logo = content.entertainment?.logo || { url: '' };

      const handleEntLogoUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
            handleUpdate('logo', 'url', reader.result);
          };
          reader.readAsDataURL(file);
        }
      };

      return (
        <div className="editor-form-pane">
          <div className="form-header">
            <div>
              <h2>Entertainment Subsite Logo</h2>
              <p>Change the main logo for the entertainment website.</p>

              <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: '#eff6ff', borderLeft: '4px solid #3b82f6', borderRadius: '4px' }}>
                <h4 style={{ color: '#1e40af', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.9rem' }}>Logo Requirements & Recommendations</h4>
                <ul style={{ fontSize: '0.85rem', color: '#334155', listStyleType: 'disc', paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                  <li><strong>Format:</strong> Use a <span className="font-bold">transparent WebP or PNG (no background)</span> for best results. We highly recommend WebP!</li>
                  <li><strong>Dimensions:</strong> The website automatically scales any uploaded logo to fit the navigation bar perfectly. Any dimension (like your original <strong>4907x2229</strong> horizontal logo) is fully accepted and will maintain its correct aspect ratio!</li>
                  <li><strong>Orientation:</strong> Both horizontal and vertical/square logos are fully supported.</li>
                  <li><strong>File Size:</strong> Please keep your file under <span className="font-bold">500KB</span> for fast loading speeds.</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="content-block-panel mt-6">
            <div className="block-header">
              <span className="block-title">Website Logo Upload</span>
            </div>
            
            <div className="form-group">
              <label>Current Logo Preview</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <div style={{ padding: '1rem', background: '#ffffff', borderRadius: '4px', border: '1px solid #e2e8f0', display: 'inline-block' }}>
                  {logo.url ? (
                    <img src={logo.url} alt="Logo Preview" style={{ maxHeight: '60px', objectFit: 'contain' }} />
                  ) : (
                    <span className="text-muted">No logo provided yet</span>
                  )}
                </div>
                {logo.url && (
                  <button className="btn-icon text-red" onClick={() => handleUpdate('logo', 'url', '')} title="Remove Logo">
                    <Trash2 size={18} /> Remove Logo
                  </button>
                )}
              </div>
            </div>
            
            <div className="form-group">
              <label>Upload New Logo Image</label>
              <input type="file" className="form-control" accept="image/*" onChange={handleEntLogoUpload} />
            </div>
          </div>
          
          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end' }}>
            <button className="btn-primary" onClick={handleSave}>
              <Save size={16} /> Save Section Changes
            </button>
          </div>
        </div>
      );
    }

    if (activeSidebar === 'entertainment' && activeSubMenu === 'navigation') {
      const nav = content.entertainment?.navigation || {
        home: 'HOME', about: 'ABOUT', films: 'ENTERTAINMENT FILMS',
        blog: 'BLOG', media: 'MEDIA', contact: 'CONTACT'
      };

      return (
        <div className="editor-form-pane">
          <div className="form-header">
            <div>
              <h2>Entertainment Navbar Text</h2>
              <p>Change the text labels for the navigation menu on the Entertainment subsite.</p>
            </div>
          </div>
          
          <div className="content-block-panel mt-6">
            <div className="block-header">
              <span className="block-title">Navigation Links</span>
            </div>
            
            <div className="form-group">
              <label>Link 1 (Default: HOME)</label>
              <input type="text" className="form-control" value={nav.home || ''} onChange={(e) => handleUpdate('navigation', 'home', e.target.value)} />
            </div>
            <div className="form-group">
              <label>Link 2 (Default: ABOUT)</label>
              <input type="text" className="form-control" value={nav.about || ''} onChange={(e) => handleUpdate('navigation', 'about', e.target.value)} />
            </div>
            <div className="form-group">
              <label>Link 3 (Default: ENTERTAINMENT FILMS)</label>
              <input type="text" className="form-control" value={nav.films || ''} onChange={(e) => handleUpdate('navigation', 'films', e.target.value)} />
            </div>
            <div className="form-group">
              <label>Link 4 (Default: BLOG)</label>
              <input type="text" className="form-control" value={nav.blog || ''} onChange={(e) => handleUpdate('navigation', 'blog', e.target.value)} />
            </div>
            <div className="form-group">
              <label>Link 5 (Default: MEDIA)</label>
              <input type="text" className="form-control" value={nav.media || ''} onChange={(e) => handleUpdate('navigation', 'media', e.target.value)} />
            </div>
            <div className="form-group">
              <label>Link 6 (Default: CONTACT)</label>
              <input type="text" className="form-control" value={nav.contact || ''} onChange={(e) => handleUpdate('navigation', 'contact', e.target.value)} />
            </div>
          </div>
          
          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end' }}>
            <button className="btn-primary" onClick={handleSave}>
              <Save size={16} /> Save Section Changes
            </button>
          </div>
        </div>
      );
    }

    if (activeSidebar === 'entertainment' && activeSubMenu === 'hero') {
      const dbHero = content.entertainment?.hero || {};
      const heroData = {
        line1: dbHero.line1 || 'SUBSTANCE',
        line2: dbHero.line2 || 'MEETS',
        line3: dbHero.line3 || 'MASS ',
        line4_p1: dbHero.line4_p1 || 'APPEAL ',
        line4_p2: dbHero.line4_p2 || 'AT',
        line5_p1: dbHero.line5_p1 || 'RED',
        line5_p2: dbHero.line5_p2 || 'ASH ',
        line5_p3: dbHero.line5_p3 || 'FILMS',
        btnText: dbHero.btnText || 'Watch More Entertainment Films'
      };

      return (
        <div className="editor-form-pane">
          <div className="form-header">
            <div>
              <h2>Entertainment Hero Text</h2>
              <p>Change the main headline text and button for the Entertainment landing page.</p>
            </div>
          </div>
          
          <div className="content-block-panel mt-6">
            <div className="block-header">
              <span className="block-title">Headline Words</span>
            </div>
            
            <div className="form-group">
              <label>Line 1 (Outline Gray)</label>
              <input type="text" className="form-control" value={heroData.line1} onChange={(e) => handleUpdate('hero', 'line1', e.target.value)} />
            </div>
            
            <div className="form-group">
              <label>Line 2 (Solid Black)</label>
              <input type="text" className="form-control" value={heroData.line2} onChange={(e) => handleUpdate('hero', 'line2', e.target.value)} />
            </div>
            
            <div className="form-group">
              <label>Line 3 (Outline Gray)</label>
              <input type="text" className="form-control" value={heroData.line3} onChange={(e) => handleUpdate('hero', 'line3', e.target.value)} />
            </div>

            <div className="form-group" style={{ display: 'flex', gap: '1rem' }}>
              <div style={{ flex: 1 }}>
                <label>Line 4 - Part 1 (Outline Gray)</label>
                <input type="text" className="form-control" value={heroData.line4_p1} onChange={(e) => handleUpdate('hero', 'line4_p1', e.target.value)} />
              </div>
              <div style={{ flex: 1 }}>
                <label>Line 4 - Part 2 (Solid Black)</label>
                <input type="text" className="form-control" value={heroData.line4_p2} onChange={(e) => handleUpdate('hero', 'line4_p2', e.target.value)} />
              </div>
            </div>

            <div className="form-group" style={{ display: 'flex', gap: '1rem' }}>
              <div style={{ flex: 1 }}>
                <label>Line 5 - Part 1 (Solid Red)</label>
                <input type="text" className="form-control" value={heroData.line5_p1} onChange={(e) => handleUpdate('hero', 'line5_p1', e.target.value)} />
              </div>
              <div style={{ flex: 1 }}>
                <label>Line 5 - Part 2 (Outline Gray)</label>
                <input type="text" className="form-control" value={heroData.line5_p2} onChange={(e) => handleUpdate('hero', 'line5_p2', e.target.value)} />
              </div>
              <div style={{ flex: 1 }}>
                <label>Line 5 - Part 3 (Solid Red)</label>
                <input type="text" className="form-control" value={heroData.line5_p3} onChange={(e) => handleUpdate('hero', 'line5_p3', e.target.value)} />
              </div>
            </div>
          </div>
          
          <div className="content-block-panel mt-6">
            <div className="block-header">
              <span className="block-title">Call to Action Button</span>
            </div>
            <div className="form-group">
              <label>Button Text</label>
              <input type="text" className="form-control" value={heroData.btnText} onChange={(e) => handleUpdate('hero', 'btnText', e.target.value)} />
            </div>
          </div>

          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end' }}>
            <button className="btn-primary" onClick={handleSave}>
              <Save size={16} /> Save Section Changes
            </button>
          </div>
        </div>
      );
    }

    if (activeSidebar === 'entertainment' && activeSubMenu === 'hero_cards') {
      const defaultCards = [
        { title: "MOVIES", link: "", image: "http://localhost:5173/src/assets/Films/Cards/Card1.jpg" },
        { title: "WEB SERIES", link: "", image: "http://localhost:5173/src/assets/Films/Cards/Card2.jpg" },
        { title: "MICRO DRAMAS", link: "", image: "http://localhost:5173/src/assets/Films/Cards/Card3.png" },
        { title: "SHORT FILMS", link: "", image: "https://img.youtube.com/vi/5AGZjsdfOio/hqdefault.jpg" },
        { title: "AI FILMS", link: "", image: "http://localhost:5173/src/assets/Films/Cards/Card5.png" },
        { title: "MUSIC VIDEOS", link: "", image: "http://localhost:5173/src/assets/Films/Cards/Card6.png" }
      ];
      const cards = content.entertainment?.heroCards || defaultCards;

      return (
        <div className="editor-form-pane">
          <div className="form-header">
            <div>
              <h2>Entertainment Hero Cards</h2>
              <p>Update the 6 film collage thumbnails on the Entertainment landing page.</p>
            </div>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginTop: '2rem' }}>
            {cards.map((card, index) => (
              <div key={index} className="list-item" style={{ flexDirection: 'column', alignItems: 'stretch', padding: '1.5rem' }}>
                <h3 style={{ margin: '0 0 1rem 0', color: 'var(--text-main)', borderBottom: '1px solid #eee', paddingBottom: '0.5rem' }}>Card 0{index + 1}</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1rem' }}>
                  {/* Image Preview */}
                  <div style={{ width: '100%', height: '220px', backgroundColor: '#f0f0f0', border: '1px solid #ddd', borderRadius: '4px', overflow: 'hidden', flexShrink: 0 }}>
                    {card.image || defaultCards[index].image ? (
                      <img src={card.image || defaultCards[index].image} alt={card.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#999', fontSize: '0.8rem', textAlign: 'center', padding: '0.5rem' }}>
                        No Image
                      </div>
                    )}
                  </div>
                  
                  {/* Inputs */}
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label>Title</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        value={card.title || ''}
                        onChange={(e) => handleUpdateHeroCard(index, 'title', e.target.value)}
                        placeholder={`e.g. ${defaultCards[index].title}`}
                      />
                    </div>
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label>YouTube/Other URL</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        value={card.link || ''}
                        onChange={(e) => handleUpdateHeroCard(index, 'link', e.target.value)}
                        placeholder="https://..."
                      />
                    </div>
                  </div>
                </div>

                <div className="form-group" style={{ marginBottom: '0.8rem' }}>
                  <label>Image URL (Auto-filled from YouTube, or paste your own)</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    value={card.image || ''}
                    onChange={(e) => handleUpdateHeroCard(index, 'image', e.target.value)}
                    placeholder="https://..."
                  />
                </div>

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label>Or Upload Image (Recommended: {index % 2 === 0 ? 'Portrait/Vertical' : 'Landscape/Horizontal'} aspect ratio, WebP under 500KB)</label>
                  <input 
                    type="file" 
                    className="form-control" 
                    accept="image/*" 
                    onChange={(e) => handleEntCardUpload(e, index)} 
                  />
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
            <button className="btn-outline-dashed" onClick={handleResetHeroCards} style={{ borderColor: 'var(--border-color)', color: 'var(--text-main)' }}>
              <RefreshCw size={16} /> Reset to Defaults
            </button>
            <button className="btn-primary" onClick={handleSave}>
              <Save size={16} /> Save Section Changes
            </button>
          </div>
        </div>
      );
    }

    if (activeSidebar === 'homepage' && activeSubMenu === 'media_links') {
      const mediaLinks = {
        instagram: 'https://www.instagram.com/redashfilms/',
        facebook: 'https://www.facebook.com/RedashFilms/',
        linkedin: 'https://www.linkedin.com/company/redash-films/',
        youtube: 'https://www.youtube.com/@redashfilms',
        ...(content.homepage?.mediaLinks || {})
      };

      return (
        <div className="editor-form-pane">
          <div className="form-header">
            <div>
              <h2>Media Links Section</h2>
              <p>Manage the social media links used in the footer and navigation.</p>
            </div>
          </div>
          
          <div className="content-block-panel">
            <div className="block-header">
              <span className="block-title">Social Media URLs</span>
            </div>
            
            <div className="form-group">
              <label>Instagram URL</label>
              <input type="text" className="form-control" value={mediaLinks.instagram} onChange={(e) => handleUpdate('mediaLinks', 'instagram', e.target.value)} />
            </div>
            <div className="form-group mt-4">
              <label>Facebook URL</label>
              <input type="text" className="form-control" value={mediaLinks.facebook} onChange={(e) => handleUpdate('mediaLinks', 'facebook', e.target.value)} />
            </div>
            <div className="form-group mt-4">
              <label>LinkedIn URL</label>
              <input type="text" className="form-control" value={mediaLinks.linkedin} onChange={(e) => handleUpdate('mediaLinks', 'linkedin', e.target.value)} />
            </div>
            <div className="form-group mt-4">
              <label>YouTube URL</label>
              <input type="text" className="form-control" value={mediaLinks.youtube} onChange={(e) => handleUpdate('mediaLinks', 'youtube', e.target.value)} />
            </div>
          </div>
          
          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end' }}>
            <button className="btn-primary" onClick={handleSave}>
              <Save size={16} /> Save Section Changes
            </button>
          </div>
        </div>
      );
    }

    if ((activeSidebar === 'homepage' && activeSubMenu === 'mediaCards') || activeSidebar === 'homepage-media') {
      const dbMediaCards = content.homepage?.mediaCards || [];
      const mergedStaticMedia = staticMedia.map((sm, index) => {
        const override = dbMediaCards.find(dbm => dbm.id === sm.id);
        if (override) {
          return { ...override, isStaticOrigin: true };
        } else {
          return { ...sm, showOnHomepage: index < 3, isStaticOrigin: true };
        }
      });
      const newDbMedia = dbMediaCards.filter(dbm => !staticMedia.some(sm => sm.id === dbm.id));
      const mediaCards = [...mergedStaticMedia, ...newDbMedia];

      return (
        <div className="editor-form-pane">
          <div className="form-header">
            <div>
              <h2>Media Cards (In the Media)</h2>
              <p>Manage the news and press cards shown on the homepage and other pages.</p>
            </div>
          </div>
          
          <div className="blocks-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(450px, 1fr))', gap: '2rem', alignItems: 'start' }}>
            {mediaCards.length === 0 && <p style={{ color: '#94a3b8', gridColumn: '1 / -1' }}>No media cards added yet. Click the button below to add one.</p>}
            
            {mediaCards.map((card, index) => (
              <div key={card.id || index} className="content-block-panel">
                <div className="block-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span className="block-title">
                    Media Card {index + 1}{card.source ? ` — ${card.source}` : ''}
                    {card.isStaticOrigin && <span style={{ marginLeft: '10px', fontSize: '0.75rem', background: '#e2e8f0', padding: '2px 6px', borderRadius: '4px' }}>Static</span>}
                  </span>
                  <button className="btn-icon" style={{ color: card.isStaticOrigin ? '#94a3b8' : '#ef4444', cursor: card.isStaticOrigin ? 'not-allowed' : 'pointer' }} onClick={() => handleRemoveMediaCard(card.id)} title={card.isStaticOrigin ? "Cannot delete static cards" : "Remove Card"} disabled={card.isStaticOrigin}>
                    <Trash2 size={16} />
                  </button>
                </div>
                
                <div className="form-group" style={{ marginTop: '1rem' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                    <input type="checkbox" checked={card.showOnHomepage !== false} onChange={(e) => handleUpdateMediaCard(card.id, 'showOnHomepage', e.target.checked)} style={{ width: '18px', height: '18px' }} />
                    Show on main Homepage
                  </label>
                </div>
                
                <div className="form-group" style={{ marginTop: '1rem' }}>
                  <label>News Source / Publication Name</label>
                  <input type="text" className="form-control" value={card.source || ''} onChange={(e) => handleUpdateMediaCard(card.id, 'source', e.target.value)} placeholder="e.g. Times of India" />
                </div>

                <div className="form-group" style={{ marginTop: '1rem' }}>
                  <label>Card Title / Headline</label>
                  <input type="text" className="form-control" value={card.title || ''} onChange={(e) => handleUpdateMediaCard(card.id, 'title', e.target.value)} />
                </div>

                <div className="form-group" style={{ marginTop: '1rem' }}>
                  <label>Card Description (Optional)</label>
                  <textarea className="form-control" value={card.description || ''} onChange={(e) => handleUpdateMediaCard(card.id, 'description', e.target.value)} rows="3"></textarea>
                </div>

                <div className="form-group" style={{ marginTop: '1rem' }}>
                  <label>Article URL (Link)</label>
                  <input type="text" className="form-control" value={card.url || ''} onChange={(e) => handleUpdateMediaCard(card.id, 'url', e.target.value)} placeholder="https://..." />
                </div>

                <div className="form-group" style={{ marginTop: '1rem' }}>
                  <label>Upload Image</label>
                  {card.image && (
                    <div style={{ marginBottom: '1rem', height: '150px', overflow: 'hidden', borderRadius: '8px', border: '1px solid #ccc' }}>
                      <img src={card.image.startsWith('/media') ? `http://localhost:5173${card.image}` : card.image} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                  )}
                  <input 
                    type="file" 
                    className="form-control" 
                    accept="image/*" 
                    onChange={async (e) => {
                      const file = e.target.files[0];
                      if (!file) return;
                      const formData = new FormData();
                      formData.append('image', file);
                      try {
                        const res = await fetch('http://localhost:5000/api/upload', {
                          method: 'POST',
                          body: formData
                        });
                        const data = await res.json();
                        if (res.ok) {
                          handleUpdateMediaCard(card.id, 'image', `http://localhost:5000${data.url}`);
                        } else {
                          alert('Upload failed: ' + data.message);
                        }
                      } catch (err) {
                        console.error(err);
                        alert('Error uploading file');
                      }
                    }} 
                  />
                </div>
              </div>
            ))}
          </div>

          <button className="btn-outline-dashed" style={{ marginTop: '1.5rem' }} onClick={handleAddMediaCard}>
            <Plus size={16} /> Add Media Card
          </button>
          
          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end' }}>
            <button className="btn-primary" onClick={() => handleSave(content)}>
              <Save size={16} /> Save Section Changes
            </button>
          </div>
        </div>
      );
    }

    if (activeSidebar === 'entertainment' && activeSubMenu === 'featured_celebs') {
      const celebsData = content.entertainment?.featuredCelebs || defaultFeaturedCelebs;
      const row1 = celebsData.row1 || defaultFeaturedCelebs.row1;
      const row2 = celebsData.row2 || defaultFeaturedCelebs.row2;

      const renderCelebRowEditor = (rowItems, rowKey, rowTitle, rowSubtitle) => (
        <div className="content-block-panel mb-6" style={{ marginBottom: '2rem' }}>
          <div className="block-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <div>
              <span className="block-title" style={{ fontSize: '1.1rem', fontWeight: '700' }}>{rowTitle}</span>
              <p style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '0.2rem' }}>{rowSubtitle}</p>
            </div>
            <button className="btn-secondary" style={{ display: 'flex', itemsAlign: 'center', gap: '0.4rem' }} onClick={() => handleOpenAddCelebModal(rowKey)}>
              <Plus size={16} /> Add Celebrity
            </button>
          </div>

          <div 
            onDragOver={(e) => handleCelebDragOver(e, rowKey, rowItems.length)}
            onDrop={(e) => handleCelebDrop(e, rowKey, rowItems.length)}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem', minHeight: '120px' }}
          >
            {rowItems.map((item, idx) => (
              <div 
                key={idx} 
                draggable
                onDragStart={(e) => handleCelebDragStart(e, rowKey, idx)}
                onDragOver={(e) => handleCelebDragOver(e, rowKey, idx)}
                onDrop={(e) => handleCelebDrop(e, rowKey, idx)}
                onDragEnd={() => stopAutoScroll()}
                className="content-block-panel" 
                style={{ 
                  padding: '1.2rem', 
                  background: '#ffffff', 
                  border: draggedCelebIndex === idx && draggedRowKey === rowKey ? '2px dashed #e20002' : '1px solid #e2e8f0', 
                  opacity: draggedCelebIndex === idx && draggedRowKey === rowKey ? 0.5 : 1,
                  borderRadius: '10px', 
                  boxShadow: '0 2px 8px rgba(0,0,0,0.04)', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  gap: '1rem',
                  cursor: 'grab'
                }}
              >
                {/* Header with Grip Handle and Reorder Buttons */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '0.6rem', borderBottom: '1px solid #f1f5f9' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <GripVertical size={18} style={{ color: '#94a3b8', cursor: 'grab' }} title="Drag to reorder or move between rows" />
                    <span style={{ fontWeight: '700', fontSize: '0.95rem', color: '#0f172a' }}>#{idx + 1} {item.name || 'New Celebrity'}</span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    {/* Move to other row button */}
                    <button 
                      type="button" 
                      className="btn-secondary" 
                      onClick={(e) => { e.stopPropagation(); handleMoveCelebToRow(rowKey, idx, rowKey === 'row1' ? 'row2' : 'row1'); }}
                      title={`Move to ${rowKey === 'row1' ? 'Row 2' : 'Row 1'}`}
                      style={{ padding: '0.2rem 0.5rem', fontSize: '0.75rem', borderRadius: '4px', fontWeight: '600' }}
                    >
                      {rowKey === 'row1' ? '↓ Row 2' : '↑ Row 1'}
                    </button>

                    <button 
                      type="button" 
                      className="btn-icon" 
                      disabled={idx === 0}
                      onClick={(e) => { e.stopPropagation(); handleMoveCeleb(rowKey, idx, -1); }} 
                      title="Move Left / Up"
                      style={{ opacity: idx === 0 ? 0.3 : 1, color: '#475569', cursor: idx === 0 ? 'default' : 'pointer' }}
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <button 
                      type="button" 
                      className="btn-icon" 
                      disabled={idx === rowItems.length - 1}
                      onClick={(e) => { e.stopPropagation(); handleMoveCeleb(rowKey, idx, 1); }} 
                      title="Move Right / Down"
                      style={{ opacity: idx === rowItems.length - 1 ? 0.3 : 1, color: '#475569', cursor: idx === rowItems.length - 1 ? 'default' : 'pointer' }}
                    >
                      <ChevronRight size={16} />
                    </button>
                    <button 
                      type="button" 
                      className="btn-icon" 
                      style={{ color: '#ef4444', marginLeft: '0.2rem' }} 
                      onClick={(e) => { e.stopPropagation(); handleRemoveCeleb(rowKey, idx); }} 
                      title="Delete Celebrity"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                {/* 1. Image Preview (Top) */}
                <div style={{ width: '100%', height: '220px', background: '#f1f5f9', borderRadius: '8px', overflow: 'hidden', border: '1px solid #cbd5e1', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                  {item.img ? (
                    <img src={item.img} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
                  ) : (
                    <div style={{ textAlign: 'center', color: '#94a3b8' }}>
                      <ImageIcon size={36} style={{ margin: '0 auto 0.4rem', opacity: 0.5 }} />
                      <span style={{ fontSize: '0.8rem', display: 'block', fontWeight: '500' }}>No Image Selected</span>
                    </div>
                  )}
                </div>

                {/* 2. Celebrity Name Input (Below Image) */}
                <div>
                  <label style={{ fontSize: '0.85rem', fontWeight: '600', display: 'block', marginBottom: '0.4rem', color: '#334155' }}>Celebrity Name</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    value={item.name || ''} 
                    onChange={(e) => handleUpdateCeleb(rowKey, idx, 'name', e.target.value)} 
                    placeholder="e.g. Ashish Lal"
                  />
                </div>

                {/* 3. Upload Image & URL Controls (Below Name) */}
                <div>
                  <label style={{ fontSize: '0.85rem', fontWeight: '600', display: 'block', marginBottom: '0.4rem', color: '#334155' }}>Upload Image / Image URL</label>
                  <div style={{ display: 'flex', gap: '0.5rem', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <input 
                        type="text" 
                        className="form-control" 
                        style={{ fontSize: '0.85rem' }}
                        value={item.img || ''} 
                        onChange={(e) => handleUpdateCeleb(rowKey, idx, 'img', e.target.value)} 
                        placeholder="Image URL or upload..."
                      />
                    </div>
                    <label className="btn-secondary" style={{ padding: '0.6rem 1rem', fontSize: '0.85rem', cursor: 'pointer', display: 'flex', itemsAlign: 'center', justifyContent: 'center', gap: '0.5rem', background: '#e20002', color: '#ffffff', border: 'none', borderRadius: '6px', fontWeight: '600', textAlign: 'center' }}>
                      <Upload size={16} /> Upload Image File
                      <input 
                        type="file" 
                        accept="image/*" 
                        style={{ display: 'none' }}
                        onChange={(e) => handleCelebFileUpload(e, rowKey, idx)} 
                      />
                    </label>
                  </div>
                </div>
              </div>
            ))}

            {/* Add Celebrity Card Button inside Grid */}
            <button 
              type="button"
              className="btn-outline-dashed" 
              style={{ 
                minHeight: '320px', 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                justifyContent: 'center', 
                gap: '0.8rem', 
                border: '2px dashed #cbd5e1', 
                borderRadius: '10px', 
                background: '#ffffff', 
                color: '#475569', 
                fontWeight: '600', 
                cursor: 'pointer',
                transition: 'all 0.2s'
              }} 
              onClick={() => handleOpenAddCelebModal(rowKey)}
            >
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#fee2e2', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#e20002' }}>
                <Plus size={24} />
              </div>
              <span style={{ fontSize: '0.95rem', color: '#0f172a' }}>+ Add Celebrity to {rowKey === 'row1' ? 'Row 1' : 'Row 2'}</span>
            </button>
          </div>
        </div>
      );

      return (
        <div className="editor-form-pane">
          <div className="form-header" style={{ marginBottom: '1.5rem' }}>
            <div>
              <h2>Featured Celebrities Section</h2>
              <p>Manage Row 1 and Row 2 celebrities displayed on the Entertainment subsite.</p>
            </div>
          </div>

          {renderCelebRowEditor(row1, 'row1', 'Row 1 Celebrities (Top Row)', 'Contains celebrities shown across the top row (default 9)')}
          {renderCelebRowEditor(row2, 'row2', 'Row 2 Celebrities (Bottom Row - Centered)', 'Contains celebrities shown centered in the second row')}

          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end' }}>
            <button className="btn-primary" onClick={handleSave}>
              <Save size={16} /> Save Section Changes
            </button>
          </div>
        </div>
      );
    }

    if (activeSidebar === 'entertainment' && activeSubMenu === 'red_hot') {
      const redHotItems = content.entertainment?.redHotCards || defaultRedHotCards;

      return (
        <div className="editor-form-pane">
          <div className="form-header" style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h2>Red Hot Section Cards</h2>
              <p>Manage the polaroid-style project & production cards displayed in the "What's Red Hot" section.</p>
            </div>
            <button className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }} onClick={handleOpenAddRedHotModal}>
              <Plus size={16} /> Add Red Hot Card
            </button>
          </div>

          <div 
            onDragOver={(e) => handleRedHotDragOver(e, redHotItems.length)}
            onDrop={(e) => handleRedHotDrop(e, redHotItems.length)}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem', minHeight: '120px' }}
          >
            {redHotItems.map((item, idx) => (
              <div 
                key={idx} 
                draggable
                onDragStart={(e) => handleRedHotDragStart(e, idx)}
                onDragOver={(e) => handleRedHotDragOver(e, idx)}
                onDrop={(e) => handleRedHotDrop(e, idx)}
                onDragEnd={() => stopAutoScroll()}
                className="content-block-panel" 
                style={{ 
                  padding: '1.2rem', 
                  background: '#ffffff', 
                  border: draggedRedHotIndex === idx ? '2px dashed #e20002' : '1px solid #e2e8f0', 
                  opacity: draggedRedHotIndex === idx ? 0.5 : 1,
                  borderRadius: '10px', 
                  boxShadow: '0 2px 8px rgba(0,0,0,0.04)', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  gap: '1rem',
                  cursor: 'grab'
                }}
              >
                {/* Header with Grip Handle, Position & Controls */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '0.6rem', borderBottom: '1px solid #f1f5f9' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <GripVertical size={18} style={{ color: '#94a3b8', cursor: 'grab' }} title="Drag to reorder" />
                    <span style={{ fontWeight: '700', fontSize: '0.95rem', color: '#0f172a' }}>#{idx + 1} {item.title || 'Red Hot Card'}</span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                    <button 
                      type="button" 
                      className="btn-icon" 
                      disabled={idx === 0}
                      onClick={(e) => { e.stopPropagation(); handleMoveRedHotCard(idx, -1); }} 
                      title="Move Left"
                      style={{ opacity: idx === 0 ? 0.3 : 1, color: '#475569', cursor: idx === 0 ? 'default' : 'pointer' }}
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <button 
                      type="button" 
                      className="btn-icon" 
                      disabled={idx === redHotItems.length - 1}
                      onClick={(e) => { e.stopPropagation(); handleMoveRedHotCard(idx, 1); }} 
                      title="Move Right"
                      style={{ opacity: idx === redHotItems.length - 1 ? 0.3 : 1, color: '#475569', cursor: idx === redHotItems.length - 1 ? 'default' : 'pointer' }}
                    >
                      <ChevronRight size={16} />
                    </button>
                    <button 
                      type="button" 
                      className="btn-icon" 
                      style={{ color: '#ef4444', marginLeft: '0.2rem' }} 
                      onClick={(e) => { e.stopPropagation(); handleRemoveRedHotCard(idx); }} 
                      title="Delete Card"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                {/* 1. Image Preview Box */}
                <div style={{ width: '100%', height: '200px', background: '#f8fafc', borderRadius: '8px', overflow: 'hidden', border: '1px solid #cbd5e1', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                  {item.image ? (
                    <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <div style={{ textAlign: 'center', color: '#94a3b8' }}>
                      <ImageIcon size={36} style={{ margin: '0 auto 0.4rem', opacity: 0.5 }} />
                      <span style={{ fontSize: '0.8rem', display: 'block', fontWeight: '500' }}>No Image Selected</span>
                    </div>
                  )}
                </div>

                {/* 2. Image URL & File Upload */}
                <div>
                  <label style={{ fontSize: '0.85rem', fontWeight: '600', display: 'block', marginBottom: '0.4rem', color: '#334155' }}>Upload Image / Poster URL</label>
                  <div style={{ display: 'flex', gap: '0.5rem', flexDirection: 'column' }}>
                    <input 
                      type="text" 
                      className="form-control" 
                      style={{ fontSize: '0.85rem' }}
                      value={item.image || ''} 
                      onChange={(e) => handleUpdateRedHotCard(idx, 'image', e.target.value)} 
                      placeholder="Image URL or upload..."
                    />
                    <label className="btn-secondary" style={{ padding: '0.6rem 1rem', fontSize: '0.85rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', background: '#e20002', color: '#ffffff', border: 'none', borderRadius: '6px', fontWeight: '600', textAlign: 'center' }}>
                      <Upload size={16} /> Upload Poster File
                      <input 
                        type="file" 
                        accept="image/*" 
                        style={{ display: 'none' }}
                        onChange={(e) => handleRedHotFileUpload(e, idx)} 
                      />
                    </label>
                  </div>
                </div>

                {/* 3. Card Title */}
                <div>
                  <label style={{ fontSize: '0.85rem', fontWeight: '600', display: 'block', marginBottom: '0.4rem', color: '#334155' }}>Card Title</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    value={item.title || ''} 
                    onChange={(e) => handleUpdateRedHotCard(idx, 'title', e.target.value)} 
                    placeholder="e.g. THE CODPASTER"
                  />
                </div>

                {/* 4. Subtitle / Description */}
                <div>
                  <label style={{ fontSize: '0.85rem', fontWeight: '600', display: 'block', marginBottom: '0.4rem', color: '#334155' }}>Description / Subtitle</label>
                  <textarea 
                    className="form-control" 
                    rows={3}
                    value={item.subtitle || ''} 
                    onChange={(e) => handleUpdateRedHotCard(idx, 'subtitle', e.target.value)} 
                    placeholder="e.g. Produced the world's first fiction web series..."
                  />
                </div>

                {/* 5. Link / Badge 1 */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: '600', display: 'block', marginBottom: '0.3rem', color: '#334155' }}>Badge 1 Text</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      style={{ fontSize: '0.85rem' }}
                      value={item.badge1Text || ''} 
                      onChange={(e) => handleUpdateRedHotCard(idx, 'badge1Text', e.target.value)} 
                      placeholder="e.g. Mid-Day"
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: '600', display: 'block', marginBottom: '0.3rem', color: '#334155' }}>Badge 1 Link / URL</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      style={{ fontSize: '0.85rem' }}
                      value={item.badge1Url || ''} 
                      onChange={(e) => handleUpdateRedHotCard(idx, 'badge1Url', e.target.value)} 
                      placeholder="https://... or #"
                    />
                  </div>
                </div>

                {/* 6. Link / Badge 2 */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: '600', display: 'block', marginBottom: '0.3rem', color: '#334155' }}>Badge 2 Text (Optional)</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      style={{ fontSize: '0.85rem' }}
                      value={item.badge2Text || ''} 
                      onChange={(e) => handleUpdateRedHotCard(idx, 'badge2Text', e.target.value)} 
                      placeholder="e.g. TOI"
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: '600', display: 'block', marginBottom: '0.3rem', color: '#334155' }}>Badge 2 Link / URL</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      style={{ fontSize: '0.85rem' }}
                      value={item.badge2Url || ''} 
                      onChange={(e) => handleUpdateRedHotCard(idx, 'badge2Url', e.target.value)} 
                      placeholder="https://... or #"
                    />
                  </div>
                </div>
              </div>
            ))}

            {/* Add Card Button inside Grid */}
            <button 
              type="button"
              className="btn-outline-dashed" 
              style={{ 
                minHeight: '380px', 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                justifyContent: 'center', 
                gap: '0.8rem', 
                border: '2px dashed #cbd5e1', 
                borderRadius: '10px', 
                background: '#ffffff', 
                color: '#475569', 
                fontWeight: '600', 
                cursor: 'pointer'
              }} 
              onClick={handleOpenAddRedHotModal}
            >
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#fee2e2', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#e20002' }}>
                <Plus size={24} />
              </div>
              <span style={{ fontSize: '0.95rem', color: '#0f172a' }}>+ Add Red Hot Card</span>
            </button>
          </div>

          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end' }}>
            <button className="btn-primary" onClick={handleSave}>
              <Save size={16} /> Save Section Changes
            </button>
          </div>
        </div>
      );
    }

    if (activeSidebar === 'entertainment-about' && activeSubMenu === 'aboutHero') {
      return (
        <div className="editor-form-pane">
          <div className="form-header">
            <div>
              <h2>About Page - Hero Section</h2>
              <p>Manage the hero text on the Entertainment About page</p>
            </div>
          </div>
          
          <div className="content-block-panel">
            <div className="form-group">
              <label>Small Heading (Eyebrow)</label>
              <input 
                type="text" 
                className="form-control" 
                value={content.entertainment?.about?.heroSmallHeading !== undefined ? content.entertainment.about.heroSmallHeading : 'WELCOME TO REDASH FILMS'} 
                onChange={(e) => {
                  setContent(prev => {
                    const newState = JSON.parse(JSON.stringify(prev));
                    if (!newState.entertainment) newState.entertainment = {};
                    if (!newState.entertainment.about) newState.entertainment.about = {};
                    newState.entertainment.about.heroSmallHeading = e.target.value;
                    return newState;
                  });
                }} 
              />
            </div>

            <div className="form-group" style={{ marginTop: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
                <label style={{ margin: 0 }}>Main Large Heading (Word by Word)</label>
                <button 
                  type="button" 
                  className="btn-secondary" 
                  style={{ padding: '0.3rem 0.6rem', fontSize: '0.8rem' }}
                  onClick={() => {
                    setContent(prev => {
                      const newState = JSON.parse(JSON.stringify(prev));
                      if (!newState.entertainment) newState.entertainment = {};
                      if (!newState.entertainment.about) newState.entertainment.about = {};
                      
                      let words = newState.entertainment.about.heroMainWords;
                      if (!words) {
                        words = (newState.entertainment.about.heroMainHeading || 'WHERE SUBSTANCE MEETS MASS APPEAL').split(' ').filter(Boolean);
                      }
                      
                      newState.entertainment.about.heroMainWords = [...words, 'NEW'];
                      return newState;
                    });
                  }}
                >
                  + Add Word
                </button>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {(content.entertainment?.about?.heroMainWords || (content.entertainment?.about?.heroMainHeading ? content.entertainment.about.heroMainHeading.split(' ') : ['WHERE', 'SUBSTANCE', 'MEETS', 'MASS', 'APPEAL'])).map((word, idx) => (
                  <div key={idx} style={{ display: 'flex', gap: '0.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '30px', background: '#f1f5f9', borderRadius: '4px', fontSize: '0.8rem', color: '#64748b', fontWeight: 'bold' }}>
                      {idx + 1}
                    </div>
                    <input 
                      type="text" 
                      className="form-control" 
                      value={word} 
                      onChange={(e) => {
                        setContent(prev => {
                          const newState = JSON.parse(JSON.stringify(prev));
                          if (!newState.entertainment) newState.entertainment = {};
                          if (!newState.entertainment.about) newState.entertainment.about = {};
                          
                          let words = newState.entertainment.about.heroMainWords;
                          if (!words) {
                            words = (newState.entertainment.about.heroMainHeading || 'WHERE SUBSTANCE MEETS MASS APPEAL').split(' ').filter(Boolean);
                          }
                          
                          words[idx] = e.target.value;
                          newState.entertainment.about.heroMainWords = words;
                          // Clear the old string version so it doesn't conflict
                          newState.entertainment.about.heroMainHeading = words.join(' ');
                          return newState;
                        });
                      }} 
                    />
                    <button 
                      type="button" 
                      className="btn-icon" 
                      style={{ color: '#ef4444' }}
                      onClick={() => {
                        setContent(prev => {
                          const newState = JSON.parse(JSON.stringify(prev));
                          let words = newState.entertainment.about.heroMainWords;
                          if (!words) {
                            words = (newState.entertainment.about.heroMainHeading || 'WHERE SUBSTANCE MEETS MASS APPEAL').split(' ').filter(Boolean);
                          }
                          words.splice(idx, 1);
                          newState.entertainment.about.heroMainWords = words;
                          newState.entertainment.about.heroMainHeading = words.join(' ');
                          return newState;
                        });
                      }}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
              <p style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.8rem' }}>Each word will appear on its own line and alternate colors automatically.</p>
            </div>
          </div>
          
          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end' }}>
            <button className="btn-primary" onClick={handleSave}>
              <Save size={16} /> Save Section Changes
            </button>
          </div>
        </div>
      );
    }

    if (activeSidebar === 'entertainment-about' && activeSubMenu === 'aboutStory') {
      return (
        <div className="editor-form-pane">
          <div className="form-header">
            <div>
              <h2>Our Story Section</h2>
              <p>Manage the paragraph and image next to it</p>
            </div>
          </div>

          <div className="section-card" style={{ marginTop: '2rem' }}>
            <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
              <div className="form-group" style={{ flex: '2 1 400px' }}>
                <label>Story Paragraph</label>
                <textarea 
                  className="form-control" 
                  rows="6"
                  value={content.entertainment?.about?.storyParagraph !== undefined ? content.entertainment.about.storyParagraph : 'has evolved into a Mumbai-based production house focused on creating compelling entertainment across films, web series, microdrama shows, television serials, AI fiction films, short films, music videos, and *emerging formats.*'} 
                  onChange={(e) => {
                    setContent(prev => {
                      const newState = JSON.parse(JSON.stringify(prev));
                      if (!newState.entertainment) newState.entertainment = {};
                      if (!newState.entertainment.about) newState.entertainment.about = {};
                      newState.entertainment.about.storyParagraph = e.target.value;
                      return newState;
                    });
                  }} 
                />
                <p style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.5rem' }}>Use asterisks to make text red. Example: *emerging formats.*</p>
              </div>

              <div className="form-group" style={{ flex: '1 1 300px' }}>
                <label>Story Image</label>
                <div className="file-upload">
                  <input 
                    type="file" 
                    id="story-image-upload" 
                    className="hidden" 
                    accept="image/*"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      
                      const formData = new FormData();
                      formData.append('image', file);
                      
                      try {
                        const res = await fetch('http://localhost:5000/api/upload', {
                          method: 'POST',
                          body: formData
                        });
                        
                        const data = await res.json();
                        if (res.ok && data.url) {
                          setContent(prev => {
                            const newState = JSON.parse(JSON.stringify(prev));
                            if (!newState.entertainment) newState.entertainment = {};
                            if (!newState.entertainment.about) newState.entertainment.about = {};
                            newState.entertainment.about.storyImage = data.url;
                            return newState;
                          });
                        } else {
                          alert('Error uploading file');
                        }
                      } catch (error) {
                        console.error("Upload error:", error);
                        alert('Error uploading file');
                      }
                    }} 
                  />
                  <label htmlFor="story-image-upload" className="file-upload-label">
                    <Upload size={24} />
                    <span>Click to upload new image</span>
                  </label>
                </div>
                {content.entertainment?.about?.storyImage && (
                  <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <img 
                      src={`http://localhost:5000${content.entertainment.about.storyImage}`} 
                      alt="Story preview" 
                      style={{ height: '80px', borderRadius: '4px', objectFit: 'cover' }} 
                    />
                    <button 
                      type="button"
                      className="btn-secondary"
                      onClick={() => {
                        setContent(prev => {
                          const newState = JSON.parse(JSON.stringify(prev));
                          newState.entertainment.about.storyImage = '';
                          return newState;
                        });
                      }}
                    >
                      Remove Image
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end' }}>
            <button className="btn-primary" onClick={handleSave}>
              <Save size={16} /> Save Section Changes
            </button>
          </div>
        </div>
      );
    }

    if (activeSidebar === 'entertainment-about' && activeSubMenu === 'aboutVision') {
      return (
        <div className="editor-form-pane">
          <div className="form-header">
            <div>
              <h2>Vision & Process Section</h2>
              <p>Manage the Vision and Process paragraphs</p>
            </div>
          </div>

          <div className="section-card" style={{ marginTop: '2rem' }}>
            <div style={{ display: 'flex', gap: '2rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
              <div className="form-group" style={{ flex: '1 1 300px' }}>
                <label>Vision Paragraph</label>
                <textarea 
                  className="form-control" 
                  rows="6"
                  value={content.entertainment?.about?.visionParagraph !== undefined ? content.entertainment.about.visionParagraph : 'Our Entertainment Films are built around *strong stories*, memorable characters, well-known actors, and ideas that can connect with wide audiences. From mainstream fiction and original IPs to commissioned entertainment projects, we aim to create content that combines *creativity with commercial potential*.'} 
                  onChange={(e) => {
                    setContent(prev => {
                      const newState = JSON.parse(JSON.stringify(prev));
                      if (!newState.entertainment) newState.entertainment = {};
                      if (!newState.entertainment.about) newState.entertainment.about = {};
                      newState.entertainment.about.visionParagraph = e.target.value;
                      return newState;
                    });
                  }} 
                />
                <p style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.5rem' }}>Use asterisks to make text bold and black. Example: *strong stories*</p>
              </div>

              <div className="form-group" style={{ flex: '1 1 300px' }}>
                <label>Process Paragraph</label>
                <textarea 
                  className="form-control" 
                  rows="6"
                  value={content.entertainment?.about?.processParagraph !== undefined ? content.entertainment.about.processParagraph : 'We work across the complete filmmaking journey — concept development, writing, pre-production, production, post-production, and delivery — bringing together *experienced writers, directors, actors, technicians and creative professionals* for every project.'} 
                  onChange={(e) => {
                    setContent(prev => {
                      const newState = JSON.parse(JSON.stringify(prev));
                      if (!newState.entertainment) newState.entertainment = {};
                      if (!newState.entertainment.about) newState.entertainment.about = {};
                      newState.entertainment.about.processParagraph = e.target.value;
                      return newState;
                    });
                  }} 
                />
                <p style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.5rem' }}>Use asterisks to make text bold and black. Example: *experienced writers*</p>
              </div>
            </div>
          </div>
          
          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end' }}>
            <button className="btn-primary" onClick={handleSave}>
              <Save size={16} /> Save Section Changes
            </button>
          </div>
        </div>
      );
    }

    if (activeSidebar === 'entertainment-about' && activeSubMenu === 'aboutInvestors') {
      const getVal = (key, defaultVal) => content.entertainment?.about?.[key] !== undefined ? content.entertainment.about[key] : defaultVal;
      
      const updateVal = (key, val) => {
        setContent(prev => {
          const newState = JSON.parse(JSON.stringify(prev));
          if (!newState.entertainment) newState.entertainment = {};
          if (!newState.entertainment.about) newState.entertainment.about = {};
          newState.entertainment.about[key] = val;
          return newState;
        });
      };

      return (
        <div className="editor-form-pane">
          <div className="form-header">
            <div>
              <h2>Investors Section</h2>
              <p>Manage the 'We Welcome Investors & Sponsors' section text</p>
            </div>
          </div>

          <div className="section-card" style={{ marginTop: '2rem' }}>
            <div className="form-group">
              <label>Top Paragraph (Eyebrow text)</label>
              <textarea 
                className="form-control" 
                rows="2"
                value={getVal('investorTopText', 'As we expand our slate of films, web series, microdrama shows, television serials, and other new formats,')} 
                onChange={(e) => updateVal('investorTopText', e.target.value)} 
              />
            </div>
            
            <div className="form-group" style={{ marginTop: '1.5rem' }}>
              <label>Red Highlight Text</label>
              <input 
                type="text" 
                className="form-control" 
                value={getVal('investorRedText', 'WE WELCOME')} 
                onChange={(e) => updateVal('investorRedText', e.target.value)} 
              />
            </div>
            
            <div style={{ display: 'flex', gap: '2rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
              <div className="form-group" style={{ flex: '1 1 300px' }}>
                <label>Main Large Text (Part 1)</label>
                <input 
                  type="text" 
                  className="form-control" 
                  value={getVal('investorMainText1', 'investors')} 
                  onChange={(e) => updateVal('investorMainText1', e.target.value)} 
                />
              </div>
              
              <div className="form-group" style={{ flex: '1 1 300px' }}>
                <label>Main Large Text (Part 2)</label>
                <input 
                  type="text" 
                  className="form-control" 
                  value={getVal('investorMainText2', '& sponsors')} 
                  onChange={(e) => updateVal('investorMainText2', e.target.value)} 
                />
              </div>
            </div>

            <div className="form-group" style={{ marginTop: '1.5rem' }}>
              <label>Bottom Descriptive Text</label>
              <textarea 
                className="form-control" 
                rows="2"
                value={getVal('investorBottomText', 'who want to be part of compelling entertainment with strong commercial potential.')} 
                onChange={(e) => updateVal('investorBottomText', e.target.value)} 
              />
            </div>
          </div>
          
          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end' }}>
            <button className="btn-primary" onClick={handleSave}>
              <Save size={16} /> Save Section Changes
            </button>
          </div>
        </div>
      );
    }
    if (activeSidebar === 'entertainment-films' && activeSubMenu === 'filmsHero') {
      const getVal = (key, defaultVal) => content['entertainment-films']?.hero?.[key] !== undefined ? content['entertainment-films'].hero[key] : defaultVal;
      const updateVal = (key, val) => {
        setContent(prev => {
          const newState = JSON.parse(JSON.stringify(prev));
          if (!newState['entertainment-films']) newState['entertainment-films'] = {};
          if (!newState['entertainment-films'].hero) newState['entertainment-films'].hero = {};
          newState['entertainment-films'].hero[key] = val;
          return newState;
        });
      };

      return (
        <div className="editor-form-pane">
          <div className="form-header">
            <div>
              <h2>Films Hero Section</h2>
              <p>Manage the intro statements for the Entertainment Films page</p>
            </div>
          </div>
          <div className="section-card" style={{ marginTop: '2rem' }}>
            <div className="form-group">
              <label>Eyebrow Heading</label>
              <textarea 
                className="form-control" rows="3"
                value={getVal('eyebrow', 'began as an IIT Delhi engineer’s venture in 2007')} 
                onChange={(e) => updateVal('eyebrow', e.target.value)} 
              />
              <p style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.5rem' }}>Note: "RedAsh" link and "IIT Delhi" link are styled manually on the frontend.</p>
            </div>
            <div className="form-group" style={{ marginTop: '1.5rem' }}>
              <label>Main Statement</label>
              <textarea 
                className="form-control" rows="4"
                value={getVal('mainStatement', 'creates movies, web series, microdramas, television shows, AI films, music videos, and emerging formats.')} 
                onChange={(e) => updateVal('mainStatement', e.target.value)} 
              />
              <p style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.5rem' }}>Note: "Its entertainment division, RedAsh Films," prefix is styled manually.</p>
            </div>
            <div className="form-group" style={{ marginTop: '1.5rem' }}>
              <label>Sub Statement</label>
              <textarea 
                className="form-control" rows="2"
                value={getVal('subStatement', 'Its enterprise division is')} 
                onChange={(e) => updateVal('subStatement', e.target.value)} 
              />
            </div>
          </div>
          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end' }}>
            <button className="btn-primary" onClick={handleSave}><Save size={16} /> Save Changes</button>
          </div>
        </div>
      );
    }

    if (activeSidebar === 'entertainment-films' && activeSubMenu === 'filmsProcess') {
      const getVal = (key, defaultVal) => content['entertainment-films']?.process?.[key] !== undefined ? content['entertainment-films'].process[key] : defaultVal;
      const updateVal = (key, val) => {
        setContent(prev => {
          const newState = JSON.parse(JSON.stringify(prev));
          if (!newState['entertainment-films']) newState['entertainment-films'] = {};
          if (!newState['entertainment-films'].process) newState['entertainment-films'].process = {};
          newState['entertainment-films'].process[key] = val;
          return newState;
        });
      };

      return (
        <div className="editor-form-pane">
          <div className="form-header">
            <div>
              <h2>Process Timeline</h2>
              <p>Manage text elements surrounding the timeline</p>
            </div>
          </div>
          <div className="section-card" style={{ marginTop: '2rem' }}>
            <div className="form-group">
              <label>Top Left Text</label>
              <textarea 
                className="form-control" rows="2"
                value={getVal('topLeft', 'handles the entire filmmaking journey')} 
                onChange={(e) => updateVal('topLeft', e.target.value)} 
              />
            </div>
            <div className="form-group" style={{ marginTop: '1.5rem' }}>
              <label>Bottom Right Text</label>
              <textarea 
                className="form-control" rows="3"
                value={getVal('bottomRight', 'working with experienced creative and technical talent to bring every project to screen.')} 
                onChange={(e) => updateVal('bottomRight', e.target.value)} 
              />
            </div>
          </div>
          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end' }}>
            <button className="btn-primary" onClick={handleSave}><Save size={16} /> Save Changes</button>
          </div>
        </div>
      );
    }


    if (activeSidebar === 'entertainment-films' && activeSubMenu === 'filmsTalent') {
      const getVal = (key, defaultVal) => content['entertainment-films']?.talent?.[key] !== undefined ? content['entertainment-films'].talent[key] : defaultVal;
      const updateVal = (key, val) => {
        setContent(prev => {
          const newState = JSON.parse(JSON.stringify(prev));
          if (!newState['entertainment-films']) newState['entertainment-films'] = {};
          if (!newState['entertainment-films'].talent) newState['entertainment-films'].talent = {};
          newState['entertainment-films'].talent[key] = val;
          return newState;
        });
      };

      const artists = content['entertainment-films']?.talent?.artists || [
        { id: 1, name: 'Ashish Lal', imdb: 'https://www.imdb.com/name/nm9318858/', image: '' },
        { id: 2, name: 'Surbhi Jyoti', imdb: 'https://www.imdb.com/name/nm5123651/', image: '' },
        { id: 3, name: 'Upendra Limaye', imdb: 'https://www.imdb.com/name/nm1822342/', image: '' },
        { id: 4, name: 'Vidya Malavade', imdb: 'https://www.imdb.com/name/nm1540244/', image: '' },
        { id: 5, name: 'Zakir Hussain', imdb: 'https://www.imdb.com/name/nm1664541/', image: '' },
        { id: 6, name: 'Navni Parihar', imdb: 'https://www.imdb.com/name/nm1106067/', image: '' },
        { id: 7, name: 'Durgesh Kumar', imdb: 'https://www.imdb.com/name/nm6294201/', image: '' },
        { id: 8, name: 'Pariva Pranati', imdb: 'https://www.imdb.com/name/nm3198154/', image: '' },
        { id: 9, name: 'Tom Alter', imdb: 'https://www.imdb.com/name/nm0022758/', image: '' },
        { id: 10, name: 'Seema Biswas', imdb: 'https://www.imdb.com/name/nm0084443/', image: '' },
        { id: 11, name: 'Kiran Kumar', imdb: 'https://www.imdb.com/name/nm0474820/', image: '' },
        { id: 12, name: 'Nibeditaa Paal', imdb: 'https://www.imdb.com/name/nm11163593/', image: '' },
        { id: 13, name: 'Piyush Sahdev', imdb: 'https://www.imdb.com/name/nm9824657/', image: '' }
      ];

      const updateArtist = (idx, field, val) => {
        const newArtists = [...artists];
        newArtists[idx] = { ...newArtists[idx], [field]: val };
        updateVal('artists', newArtists);
      };

      const addArtist = () => {
        const newArtists = [...artists, { id: Date.now(), name: 'New Artist', imdb: '', image: '' }];
        updateVal('artists', newArtists);
      };

      const removeArtist = (idx) => {
        const newArtists = artists.filter((_, i) => i !== idx);
        updateVal('artists', newArtists);
      };

      const handleArtistImageUpload = async (file, idx) => {
        if (!file) return;
        const formData = new FormData();
        formData.append('image', file);
        try {
          const res = await fetch('http://localhost:5000/api/upload', { method: 'POST', body: formData });
          const data = await res.json();
          if (res.ok && data.url) {
            updateArtist(idx, 'image', data.url);
          } else {
            alert('Error uploading file');
          }
        } catch (error) {
          console.error("Upload error:", error);
          alert('Error uploading file');
        }
      };

      const handleTalentDragStart = (e, index) => {
        setDraggedTalentIndex(index);
        e.dataTransfer.effectAllowed = 'move';
      };

      const handleTalentDragOver = (e, index) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        startAutoScrollIfNeeded(e.clientY);
      };

      const handleTalentDrop = (e, targetIndex) => {
        e.preventDefault();
        stopAutoScroll();
        if (draggedTalentIndex === null || draggedTalentIndex === targetIndex) return;

        const newArtists = [...artists];
        if (draggedTalentIndex >= 0 && draggedTalentIndex < newArtists.length) {
          const [movedItem] = newArtists.splice(draggedTalentIndex, 1);
          newArtists.splice(targetIndex, 0, movedItem);
          updateVal('artists', newArtists);
        }
        setDraggedTalentIndex(null);
      };

      const staticImageMap = {
        'Ashish Lal': celeb1,
        'Surbhi Jyoti': celeb2,
        'Upendra Limaye': celeb3,
        'Vidya Malavade': celeb4,
        'Zakir Hussain': celeb5,
        'Navni Parihar': celeb6,
        'Durgesh Kumar': celeb7,
        'Pariva Pranati': celeb8,
        'Tom Alter': celeb9,
        'Seema Biswas': celeb10,
        'Kiran Kumar': celeb11,
        'Nibeditaa Paal': celeb12,
        'Piyush Sahdev': celeb13,
      };

      return (
        <div className="editor-form-pane">
          <div className="form-header">
            <div>
              <h2>Talent Showcase</h2>
              <p>Manage the headings and the list of artists</p>
            </div>
          </div>

          <div className="section-card" style={{ marginTop: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <div>
                <h3 className="section-title" style={{ margin: 0 }}>Artists List</h3>
                <p style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '0.2rem' }}>Manage the artists showcased in the films talent section.</p>
              </div>
              <button type="button" className="btn-secondary" onClick={addArtist} style={{ display: 'flex', itemsAlign: 'center', gap: '0.4rem' }}>
                <Plus size={16} /> Add Artist
              </button>
            </div>
            
            <div 
              onDragOver={(e) => handleTalentDragOver(e, artists.length)}
              onDrop={(e) => handleTalentDrop(e, artists.length)}
              style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem', minHeight: '120px' }}
            >
              {artists.map((artist, idx) => (
                <div 
                  key={artist.id || idx} 
                  draggable
                  onDragStart={(e) => handleTalentDragStart(e, idx)}
                  onDragOver={(e) => handleTalentDragOver(e, idx)}
                  onDrop={(e) => handleTalentDrop(e, idx)}
                  onDragEnd={() => { stopAutoScroll(); setDraggedTalentIndex(null); }}
                  className="content-block-panel" 
                  style={{ 
                    padding: '1.2rem', 
                    background: '#ffffff', 
                    border: draggedTalentIndex === idx ? '2px dashed #e20002' : '1px solid #e2e8f0', 
                    opacity: draggedTalentIndex === idx ? 0.5 : 1,
                    borderRadius: '10px', 
                    boxShadow: '0 2px 8px rgba(0,0,0,0.04)', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    gap: '1rem',
                    cursor: 'grab'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '0.6rem', borderBottom: '1px solid #f1f5f9' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <GripVertical size={18} style={{ color: '#94a3b8', cursor: 'grab' }} title="Drag to reorder" />
                      <span style={{ fontWeight: '700', fontSize: '0.95rem', color: '#0f172a' }}>#{idx + 1} {artist.name || 'New Artist'}</span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      <button 
                        type="button" 
                        className="btn-icon" 
                        disabled={idx === 0}
                        onClick={(e) => { 
                          e.stopPropagation(); 
                          if (idx > 0) {
                            const newArtists = [...artists];
                            const temp = newArtists[idx];
                            newArtists[idx] = newArtists[idx - 1];
                            newArtists[idx - 1] = temp;
                            updateVal('artists', newArtists);
                          }
                        }} 
                        title="Move Left"
                        style={{ opacity: idx === 0 ? 0.3 : 1, color: '#475569', cursor: idx === 0 ? 'default' : 'pointer' }}
                      >
                        <ChevronLeft size={16} />
                      </button>
                      <button 
                        type="button" 
                        className="btn-icon" 
                        disabled={idx === artists.length - 1}
                        onClick={(e) => { 
                          e.stopPropagation(); 
                          if (idx < artists.length - 1) {
                            const newArtists = [...artists];
                            const temp = newArtists[idx];
                            newArtists[idx] = newArtists[idx + 1];
                            newArtists[idx + 1] = temp;
                            updateVal('artists', newArtists);
                          }
                        }} 
                        title="Move Right"
                        style={{ opacity: idx === artists.length - 1 ? 0.3 : 1, color: '#475569', cursor: idx === artists.length - 1 ? 'default' : 'pointer' }}
                      >
                        <ChevronRight size={16} />
                      </button>
                      <button 
                        type="button" 
                        className="btn-icon" 
                        style={{ color: '#ef4444', marginLeft: '0.2rem' }} 
                        onClick={(e) => { e.stopPropagation(); removeArtist(idx); }} 
                        title="Delete Artist"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>

                  <div style={{ width: '100%', height: '220px', background: '#f1f5f9', borderRadius: '8px', overflow: 'hidden', border: '1px solid #cbd5e1', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                    {artist.image || staticImageMap[artist.name] ? (
                      <img 
                        src={artist.image ? (artist.image.startsWith('http') || artist.image.startsWith('/uploads') ? (artist.image.startsWith('/uploads') ? `http://localhost:5000${artist.image}` : artist.image) : `http://localhost:5000${artist.image}`) : staticImageMap[artist.name]} 
                        alt={artist.name} 
                        style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} 
                      />
                    ) : (
                      <div style={{ textAlign: 'center', color: '#94a3b8' }}>
                        <ImageIcon size={36} style={{ margin: '0 auto 0.4rem', opacity: 0.5 }} />
                        <span style={{ fontSize: '0.8rem', display: 'block', fontWeight: '500' }}>No Image Selected</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <label style={{ fontSize: '0.85rem', fontWeight: '600', display: 'block', marginBottom: '0.4rem', color: '#334155' }}>Artist Name</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      value={artist.name || ''} 
                      onChange={(e) => updateArtist(idx, 'name', e.target.value)} 
                      placeholder="e.g. Ashish Lal"
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '0.85rem', fontWeight: '600', display: 'block', marginBottom: '0.4rem', color: '#334155' }}>IMDB/Profile Link</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      value={artist.imdb || ''} 
                      onChange={(e) => updateArtist(idx, 'imdb', e.target.value)} 
                      placeholder="https://imdb.com/..."
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '0.85rem', fontWeight: '600', display: 'block', marginBottom: '0.4rem', color: '#334155' }}>Upload Image / Image URL</label>
                    <div style={{ display: 'flex', gap: '0.5rem', flexDirection: 'column' }}>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <input 
                          type="text" 
                          className="form-control" 
                          style={{ fontSize: '0.85rem' }}
                          value={artist.image || ''} 
                          onChange={(e) => updateArtist(idx, 'image', e.target.value)} 
                          placeholder="Image URL or upload..."
                        />
                      </div>
                      <label className="btn-secondary" style={{ padding: '0.6rem 1rem', fontSize: '0.85rem', cursor: 'pointer', display: 'flex', itemsAlign: 'center', justifyContent: 'center', gap: '0.5rem', background: '#e20002', color: '#ffffff', border: 'none', borderRadius: '6px', fontWeight: '600', textAlign: 'center' }}>
                        <Upload size={16} /> Upload Image File
                        <input 
                          type="file" 
                          accept="image/*" 
                          style={{ display: 'none' }}
                          onChange={(e) => handleArtistImageUpload(e.target.files?.[0], idx)} 
                        />
                      </label>
                    </div>
                  </div>
                </div>
              ))}
              
              <button 
                type="button"
                className="btn-outline-dashed" 
                style={{ 
                  minHeight: '320px', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  gap: '1rem', 
                  color: '#64748b', 
                  background: '#f8fafc',
                  border: '2px dashed #cbd5e1',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }} 
                onClick={addArtist}
              >
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8' }}>
                  <Plus size={24} />
                </div>
                <span style={{ fontSize: '0.95rem', fontWeight: '600' }}>Add Artist</span>
              </button>
            </div>
          </div>

          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end' }}>
            <button className="btn-primary" onClick={handleSave}><Save size={16} /> Save Changes</button>
          </div>
        </div>
      );
    }

    if (activeSidebar === 'entertainment' && activeSubMenu === 'projects') {
      const hCards = content.entertainment?.projects?.horizontalCards || defaultHorizontalProjects;
      const vCards = content.entertainment?.projects?.verticalCards || defaultVerticalProjects;

      return (
        <div className="editor-form-pane">
          {/* Section Header */}
          <div className="form-header" style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h2>Entertainment Projects</h2>
              <p>Manage 9 horizontal project cards and vertical project cards below.</p>
            </div>
            <div style={{ display: 'flex', gap: '0.8rem' }}>
              <button className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }} onClick={() => handleOpenAddProjectModal('horizontal')}>
                <Plus size={16} /> Add Horizontal Card
              </button>
              <button className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: '#0f172a', color: '#fff' }} onClick={() => handleOpenAddProjectModal('vertical')}>
                <Plus size={16} /> Add Vertical Card
              </button>
            </div>
          </div>

          {/* 1. HORIZONTAL CARDS SECTION (9 Horizontal Cards) */}
          <div style={{ marginBottom: '3rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: '2px solid #e20002' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: '700', color: '#0f172a', margin: 0 }}>
                1. Horizontal Project Cards ({hCards.length} Cards)
              </h3>
              <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: '500' }}>Widescreen (16:9) Format</span>
            </div>

            <div 
              onDragOver={(e) => handleProjectDragOver(e, 'horizontal', hCards.length)}
              onDrop={(e) => handleProjectDrop(e, 'horizontal', hCards.length)}
              style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem', minHeight: '120px' }}
            >
              {hCards.map((item, idx) => (
                <div 
                  key={idx} 
                  draggable
                  onDragStart={(e) => handleProjectDragStart(e, 'horizontal', idx)}
                  onDragOver={(e) => handleProjectDragOver(e, 'horizontal', idx)}
                  onDrop={(e) => handleProjectDrop(e, 'horizontal', idx)}
                  onDragEnd={() => stopAutoScroll()}
                  className="content-block-panel" 
                  style={{ 
                    padding: '1.2rem', 
                    background: '#ffffff', 
                    border: (draggedProjectState.type === 'horizontal' && draggedProjectState.index === idx) ? '2px dashed #e20002' : '1px solid #e2e8f0', 
                    opacity: (draggedProjectState.type === 'horizontal' && draggedProjectState.index === idx) ? 0.5 : 1,
                    borderRadius: '10px', 
                    boxShadow: '0 2px 8px rgba(0,0,0,0.04)', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    gap: '1rem',
                    cursor: 'grab'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '0.6rem', borderBottom: '1px solid #f1f5f9' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <GripVertical size={18} style={{ color: '#94a3b8', cursor: 'grab' }} title="Drag to reorder" />
                      <span style={{ fontWeight: '700', fontSize: '0.95rem', color: '#0f172a' }}>Horizontal #{idx + 1}: {item.title || 'Project'}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                      <button 
                        type="button" 
                        className="btn-icon" 
                        disabled={idx === 0}
                        onClick={() => handleMoveProjectCard('horizontal', idx, -1)} 
                        title="Move Left"
                        style={{ opacity: idx === 0 ? 0.3 : 1, color: '#475569', cursor: idx === 0 ? 'default' : 'pointer' }}
                      >
                        <ChevronLeft size={16} />
                      </button>
                      <button 
                        type="button" 
                        className="btn-icon" 
                        disabled={idx === hCards.length - 1}
                        onClick={() => handleMoveProjectCard('horizontal', idx, 1)} 
                        title="Move Right"
                        style={{ opacity: idx === hCards.length - 1 ? 0.3 : 1, color: '#475569', cursor: idx === hCards.length - 1 ? 'default' : 'pointer' }}
                      >
                        <ChevronRight size={16} />
                      </button>
                      <button 
                        type="button" 
                        className="btn-icon" 
                        style={{ color: '#ef4444', marginLeft: '0.2rem' }} 
                        onClick={() => handleRemoveProjectCard('horizontal', idx)} 
                        title="Delete Card"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>

                  {/* Horizontal Image Preview */}
                  <div style={{ width: '100%', height: '170px', background: '#f8fafc', borderRadius: '8px', overflow: 'hidden', border: '1px solid #cbd5e1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {item.image ? (
                      <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <div style={{ textAlign: 'center', color: '#94a3b8' }}>
                        <ImageIcon size={36} style={{ margin: '0 auto 0.4rem', opacity: 0.5 }} />
                        <span style={{ fontSize: '0.8rem', display: 'block', fontWeight: '500' }}>No Image Selected</span>
                      </div>
                    )}
                  </div>

                  {/* Image URL & Upload */}
                  <div>
                    <label style={{ fontSize: '0.85rem', fontWeight: '600', display: 'block', marginBottom: '0.4rem', color: '#334155' }}>Poster / Image URL</label>
                    <div style={{ display: 'flex', gap: '0.5rem', flexDirection: 'column' }}>
                      <input 
                        type="text" 
                        className="form-control" 
                        style={{ fontSize: '0.85rem' }}
                        value={item.image || ''} 
                        onChange={(e) => handleUpdateProjectCard('horizontal', idx, 'image', e.target.value)} 
                        placeholder="Image URL or upload..."
                      />
                      <label className="btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', background: '#e20002', color: '#ffffff', border: 'none', borderRadius: '6px', fontWeight: '600' }}>
                        <Upload size={16} /> Upload Image File
                        <input 
                          type="file" 
                          accept="image/*" 
                          style={{ display: 'none' }}
                          onChange={(e) => handleProjectFileUpload(e, 'horizontal', idx)} 
                        />
                      </label>
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                    <div>
                      <label style={{ fontSize: '0.85rem', fontWeight: '600', display: 'block', marginBottom: '0.4rem', color: '#334155' }}>Entertainment Home Page Link</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        value={item.linkHome !== undefined ? item.linkHome : (item.link || '')} 
                        onChange={(e) => {
                          const newLink = e.target.value;
                          handleUpdateProjectCard('horizontal', idx, 'linkHome', newLink);
                          handleUpdateProjectCard('horizontal', idx, 'link', newLink);
                          const ytId = extractYouTubeId(newLink);
                          if (ytId && !item.image) {
                            handleUpdateProjectCard('horizontal', idx, 'image', `https://img.youtube.com/vi/${ytId}/maxresdefault.jpg`);
                          }
                        }} 
                        placeholder="Link for the Entertainment Homepage..."
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.85rem', fontWeight: '600', display: 'block', marginBottom: '0.4rem', color: '#334155' }}>Entertainment Films Page Link</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        value={item.linkFilms !== undefined ? item.linkFilms : (item.link || '')} 
                        onChange={(e) => {
                          const newLink = e.target.value;
                          handleUpdateProjectCard('horizontal', idx, 'linkFilms', newLink);
                          const ytId = extractYouTubeId(newLink);
                          if (ytId && !item.image) {
                            handleUpdateProjectCard('horizontal', idx, 'image', `https://img.youtube.com/vi/${ytId}/maxresdefault.jpg`);
                          }
                        }} 
                        placeholder="Link for the Entertainment Films Page..."
                      />
                    </div>
                  </div>
                </div>
              ))}

              <button 
                type="button"
                className="btn-outline-dashed" 
                style={{ 
                  minHeight: '340px', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  gap: '0.8rem', 
                  border: '2px dashed #cbd5e1', 
                  borderRadius: '10px', 
                  background: '#ffffff', 
                  color: '#475569', 
                  fontWeight: '600', 
                  cursor: 'pointer'
                }} 
                onClick={() => handleOpenAddProjectModal('horizontal')}
              >
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#fee2e2', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#e20002' }}>
                  <Plus size={24} />
                </div>
                <span style={{ fontSize: '0.95rem', color: '#0f172a' }}>+ Add Horizontal Project Card</span>
              </button>
            </div>
          </div>

          {/* 2. VERTICAL CARDS SECTION (Vertical Cards Below) */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: '2px solid #0f172a' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: '700', color: '#0f172a', margin: 0 }}>
                2. Vertical Project Cards ({vCards.length} Cards)
              </h3>
              <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: '500' }}>Portrait (3:4) Poster Format</span>
            </div>

            <div 
              onDragOver={(e) => handleProjectDragOver(e, 'vertical', vCards.length)}
              onDrop={(e) => handleProjectDrop(e, 'vertical', vCards.length)}
              style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem', minHeight: '120px' }}
            >
              {vCards.map((item, idx) => (
                <div 
                  key={idx} 
                  draggable
                  onDragStart={(e) => handleProjectDragStart(e, 'vertical', idx)}
                  onDragOver={(e) => handleProjectDragOver(e, 'vertical', idx)}
                  onDrop={(e) => handleProjectDrop(e, 'vertical', idx)}
                  onDragEnd={() => stopAutoScroll()}
                  className="content-block-panel" 
                  style={{ 
                    padding: '1.2rem', 
                    background: '#ffffff', 
                    border: (draggedProjectState.type === 'vertical' && draggedProjectState.index === idx) ? '2px dashed #0f172a' : '1px solid #e2e8f0', 
                    opacity: (draggedProjectState.type === 'vertical' && draggedProjectState.index === idx) ? 0.5 : 1,
                    borderRadius: '10px', 
                    boxShadow: '0 2px 8px rgba(0,0,0,0.04)', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    gap: '1rem',
                    cursor: 'grab'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '0.6rem', borderBottom: '1px solid #f1f5f9' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <GripVertical size={18} style={{ color: '#94a3b8', cursor: 'grab' }} title="Drag to reorder" />
                      <span style={{ fontWeight: '700', fontSize: '0.95rem', color: '#0f172a' }}>Vertical #{idx + 1}: {item.title || 'Project'}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                      <button 
                        type="button" 
                        className="btn-icon" 
                        disabled={idx === 0}
                        onClick={() => handleMoveProjectCard('vertical', idx, -1)} 
                        title="Move Left"
                        style={{ opacity: idx === 0 ? 0.3 : 1, color: '#475569', cursor: idx === 0 ? 'default' : 'pointer' }}
                      >
                        <ChevronLeft size={16} />
                      </button>
                      <button 
                        type="button" 
                        className="btn-icon" 
                        disabled={idx === vCards.length - 1}
                        onClick={() => handleMoveProjectCard('vertical', idx, 1)} 
                        title="Move Right"
                        style={{ opacity: idx === vCards.length - 1 ? 0.3 : 1, color: '#475569', cursor: idx === vCards.length - 1 ? 'default' : 'pointer' }}
                      >
                        <ChevronRight size={16} />
                      </button>
                      <button 
                        type="button" 
                        className="btn-icon" 
                        style={{ color: '#ef4444', marginLeft: '0.2rem' }} 
                        onClick={() => handleRemoveProjectCard('vertical', idx)} 
                        title="Delete Card"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>

                  {/* Vertical Image Preview */}
                  <div style={{ width: '100%', height: '220px', background: '#f8fafc', borderRadius: '8px', overflow: 'hidden', border: '1px solid #cbd5e1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {item.image ? (
                      <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <div style={{ textAlign: 'center', color: '#94a3b8' }}>
                        <ImageIcon size={36} style={{ margin: '0 auto 0.4rem', opacity: 0.5 }} />
                        <span style={{ fontSize: '0.8rem', display: 'block', fontWeight: '500' }}>No Image Selected</span>
                      </div>
                    )}
                  </div>

                  {/* Image URL & Upload */}
                  <div>
                    <label style={{ fontSize: '0.85rem', fontWeight: '600', display: 'block', marginBottom: '0.4rem', color: '#334155' }}>Poster / Image URL</label>
                    <div style={{ display: 'flex', gap: '0.5rem', flexDirection: 'column' }}>
                      <input 
                        type="text" 
                        className="form-control" 
                        style={{ fontSize: '0.85rem' }}
                        value={item.image || ''} 
                        onChange={(e) => handleUpdateProjectCard('vertical', idx, 'image', e.target.value)} 
                        placeholder="Image URL or upload..."
                      />
                      <label className="btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', background: '#0f172a', color: '#ffffff', border: 'none', borderRadius: '6px', fontWeight: '600' }}>
                        <Upload size={16} /> Upload Poster File
                        <input 
                          type="file" 
                          accept="image/*" 
                          style={{ display: 'none' }}
                          onChange={(e) => handleProjectFileUpload(e, 'vertical', idx)} 
                        />
                      </label>
                    </div>
                  </div>

                  <div>
                    <label style={{ fontSize: '0.85rem', fontWeight: '600', display: 'block', marginBottom: '0.4rem', color: '#334155' }}>Target Link / Video URL</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      value={item.link || ''} 
                      onChange={(e) => {
                        const newLink = e.target.value;
                        handleUpdateProjectCard('vertical', idx, 'link', newLink);
                        const ytId = extractYouTubeId(newLink);
                        if (ytId && !item.image) {
                          handleUpdateProjectCard('vertical', idx, 'image', `https://img.youtube.com/vi/${ytId}/maxresdefault.jpg`);
                        }
                      }} 
                      placeholder="https://... or #"
                    />
                  </div>
                </div>
              ))}

              <button 
                type="button"
                className="btn-outline-dashed" 
                style={{ 
                  minHeight: '360px', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  gap: '0.8rem', 
                  border: '2px dashed #cbd5e1', 
                  borderRadius: '10px', 
                  background: '#ffffff', 
                  color: '#475569', 
                  fontWeight: '600', 
                  cursor: 'pointer'
                }} 
                onClick={() => handleOpenAddProjectModal('vertical')}
              >
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0f172a' }}>
                  <Plus size={24} />
                </div>
                <span style={{ fontSize: '0.95rem', color: '#0f172a' }}>+ Add Vertical Project Card</span>
              </button>
            </div>
          </div>

          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end' }}>
            <button className="btn-primary" onClick={handleSave}>
              <Save size={16} /> Save Section Changes
            </button>
          </div>
        </div>
      );
    }

    if (activeSidebar === 'entertainment' && activeSubMenu === 'clients') {
      const clientItems = content.entertainment?.clients || defaultClients;

      return (
        <div className="editor-form-pane">
          <div className="form-header" style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h2>Entertainment Partners / Client Logos</h2>
              <p>Manage partner client logos shown in the edge-to-edge floating marquee section.</p>
            </div>
            <button className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }} onClick={handleOpenAddClientModal}>
              <Plus size={16} /> Add Client / Partner
            </button>
          </div>

          <div 
            onDragOver={(e) => handleClientDragOver(e, clientItems.length)}
            onDrop={(e) => handleClientDrop(e, clientItems.length)}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem', minHeight: '120px' }}
          >
            {clientItems.map((item, idx) => (
              <div 
                key={idx} 
                draggable
                onDragStart={(e) => handleClientDragStart(e, idx)}
                onDragOver={(e) => handleClientDragOver(e, idx)}
                onDrop={(e) => handleClientDrop(e, idx)}
                onDragEnd={() => stopAutoScroll()}
                className="content-block-panel" 
                style={{ 
                  padding: '1.2rem', 
                  background: '#ffffff', 
                  border: draggedClientIndex === idx ? '2px dashed #e20002' : '1px solid #e2e8f0', 
                  opacity: draggedClientIndex === idx ? 0.5 : 1,
                  borderRadius: '10px', 
                  boxShadow: '0 2px 8px rgba(0,0,0,0.04)', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  gap: '1rem',
                  cursor: 'grab'
                }}
              >
                {/* Header with Grip Handle, Position & Controls */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '0.6rem', borderBottom: '1px solid #f1f5f9' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <GripVertical size={18} style={{ color: '#94a3b8', cursor: 'grab' }} title="Drag to reorder" />
                    <span style={{ fontWeight: '700', fontSize: '0.95rem', color: '#0f172a' }}>#{idx + 1} Logo</span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                    <button 
                      type="button" 
                      className="btn-icon" 
                      disabled={idx === 0}
                      onClick={(e) => { e.stopPropagation(); handleMoveClient(idx, -1); }} 
                      title="Move Left"
                      style={{ opacity: idx === 0 ? 0.3 : 1, color: '#475569', cursor: idx === 0 ? 'default' : 'pointer' }}
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <button 
                      type="button" 
                      className="btn-icon" 
                      disabled={idx === clientItems.length - 1}
                      onClick={(e) => { e.stopPropagation(); handleMoveClient(idx, 1); }} 
                      title="Move Right"
                      style={{ opacity: idx === clientItems.length - 1 ? 0.3 : 1, color: '#475569', cursor: idx === clientItems.length - 1 ? 'default' : 'pointer' }}
                    >
                      <ChevronRight size={16} />
                    </button>
                    <button 
                      type="button" 
                      className="btn-icon" 
                      style={{ color: '#ef4444', marginLeft: '0.2rem' }} 
                      onClick={(e) => { e.stopPropagation(); handleRemoveClient(idx); }} 
                      title="Delete Logo"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                {/* 1. Image Preview (Top) */}
                <div style={{ width: '100%', height: '180px', background: '#f8fafc', borderRadius: '8px', overflow: 'hidden', border: '1px solid #cbd5e1', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
                  {item.img ? (
                    <img src={item.img} alt={`Logo ${idx + 1}`} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                  ) : (
                    <div style={{ textAlign: 'center', color: '#94a3b8' }}>
                      <ImageIcon size={36} style={{ margin: '0 auto 0.4rem', opacity: 0.5 }} />
                      <span style={{ fontSize: '0.8rem', display: 'block', fontWeight: '500' }}>No Logo Selected</span>
                    </div>
                  )}
                </div>

                {/* 2. Upload Image & URL Controls */}
                <div>
                  <label style={{ fontSize: '0.85rem', fontWeight: '600', display: 'block', marginBottom: '0.4rem', color: '#334155' }}>Upload Logo / Image URL</label>
                  <div style={{ display: 'flex', gap: '0.5rem', flexDirection: 'column' }}>
                    <input 
                      type="text" 
                      className="form-control" 
                      style={{ fontSize: '0.85rem' }}
                      value={item.img || ''} 
                      onChange={(e) => handleUpdateClient(idx, 'img', e.target.value)} 
                      placeholder="Image URL or upload..."
                    />
                    <label className="btn-secondary" style={{ padding: '0.6rem 1rem', fontSize: '0.85rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', background: '#e20002', color: '#ffffff', border: 'none', borderRadius: '6px', fontWeight: '600', textAlign: 'center' }}>
                      <Upload size={16} /> Upload Logo File
                      <input 
                        type="file" 
                        accept="image/*" 
                        style={{ display: 'none' }}
                        onChange={(e) => handleClientFileUpload(e, idx)} 
                      />
                    </label>
                  </div>
                </div>
              </div>
            ))}

            {/* Add Client Card Button inside Grid */}
            <button 
              type="button"
              className="btn-outline-dashed" 
              style={{ 
                minHeight: '280px', 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                justifyContent: 'center', 
                gap: '0.8rem', 
                border: '2px dashed #cbd5e1', 
                borderRadius: '10px', 
                background: '#ffffff', 
                color: '#475569', 
                fontWeight: '600', 
                cursor: 'pointer'
              }} 
              onClick={handleOpenAddClientModal}
            >
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#fee2e2', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#e20002' }}>
                <Plus size={24} />
              </div>
              <span style={{ fontSize: '0.95rem', color: '#0f172a' }}>+ Add Client / Partner</span>
            </button>
          </div>

          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end' }}>
            <button className="btn-primary" onClick={handleSave}>
              <Save size={16} /> Save Section Changes
            </button>
          </div>
        </div>
      );
    }

    // --- ENTERTAINMENT MEDIA SETTINGS ---
    if (activeSidebar === 'entertainment-media' && activeSubMenu === 'media') {
      const getVal = (key, defaultVal) => content.entertainment?.mediaConfig?.[key] !== undefined ? content.entertainment.mediaConfig[key] : defaultVal;
      
      const updateVal = (key, val) => {
        setContent(prev => {
          const newState = JSON.parse(JSON.stringify(prev));
          if (!newState.entertainment) newState.entertainment = {};
          if (!newState.entertainment.mediaConfig) newState.entertainment.mediaConfig = {};
          newState.entertainment.mediaConfig[key] = val;
          return newState;
        });
      };

      return (
        <div className="editor-form-pane">
          <div className="form-header">
            <div>
              <h2>Media Coverage Settings</h2>
              <p>Manage the statement, coverage articles, and press publications</p>
            </div>
          </div>

          {/* Sub Statement Editor */}
          <div className="form-card" style={{ marginBottom: '2rem' }}>
            <label style={{ fontSize: '0.9rem', fontWeight: '600', display: 'block', marginBottom: '0.6rem', color: '#334155' }}>Sub Statement</label>
            <div style={{ border: '1px solid #cbd5e1', borderRadius: '8px', overflow: 'hidden' }}>
              <textarea
                value={getVal('subtitle', 'Featured news articles on RedAsh Films')}
                onChange={(e) => updateVal('subtitle', e.target.value)}
                placeholder="Enter sub statement..."
                style={{
                  width: '100%',
                  height: '150px',
                  padding: '12px',
                  border: 'none',
                  outline: 'none',
                  resize: 'vertical',
                  fontFamily: 'inherit',
                  fontSize: '0.95rem'
                }}
              />
            </div>
            <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'flex-end' }}>
              <button type="button" className="btn-primary" onClick={() => handleSave(content)} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: '#e20002', color: '#fff', border: 'none', padding: '0.6rem 1.4rem', borderRadius: '6px', fontWeight: '600', cursor: 'pointer' }}>
                <Save size={16} /> Save Changes
              </button>
            </div>

            <div style={{ marginTop: '2.5rem', paddingTop: '1.5rem', borderTop: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
              <label style={{ fontSize: '0.95rem', fontWeight: '600', color: '#334155', textAlign: 'center' }}>Edit media cards</label>
              <button 
                type="button" 
                onClick={() => {
                  setActiveSidebar('homepage-media');
                }}
                style={{ 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  background: '#e20002', 
                  color: '#ffffff', 
                  border: 'none', 
                  padding: '0.6rem 2.5rem', 
                  borderRadius: '6px', 
                  fontWeight: '600', 
                  fontSize: '0.95rem',
                  cursor: 'pointer',
                  boxShadow: '0 4px 6px -1px rgba(226, 0, 2, 0.2), 0 2px 4px -1px rgba(226, 0, 2, 0.1)'
                }}
              >
                Edit
              </button>
              </div>
          </div>
        </div>
      );
    }

    // --- ENTERTAINMENT BLOG SETTINGS ---
    if (activeSidebar === 'entertainment-contact' && activeSubMenu === 'contact') {
      const getVal = (key, defaultVal) => content.entertainment?.contact?.[key] !== undefined ? content.entertainment.contact[key] : defaultVal;
      
      const updateVal = (key, val) => {
        setContent(prev => {
          const newState = JSON.parse(JSON.stringify(prev));
          if (!newState.entertainment) newState.entertainment = {};
          if (!newState.entertainment.contact) newState.entertainment.contact = {};
          newState.entertainment.contact[key] = val;
          return newState;
        });
      };

      return (
        <div className="editor-form-pane">
          <div className="form-header">
            <div>
              <h2>Entertainment Contact</h2>
              <p>Manage the "GET IN TOUCH" subtext specifically for the Entertainment Contact page.</p>
            </div>
          </div>
          
          <div className="section-card" style={{ marginTop: '2rem' }}>
            <div className="form-group">
              <label>Header Subtitle</label>
              <textarea 
                className="form-control" rows="3"
                value={getVal('headerSubtitle', 'Potential Clients, Investors, and Sponsors can email or fill the form below')} 
                onChange={(e) => updateVal('headerSubtitle', e.target.value)} 
              />
              <p style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.5rem' }}>This text appears below the "GET IN TOUCH" heading.</p>
            </div>

            <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'flex-end' }}>
              <button type="button" className="btn-primary" onClick={() => handleSave(content)} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: '#e20002', color: '#fff', border: 'none', padding: '0.6rem 1.4rem', borderRadius: '6px', fontWeight: '600', cursor: 'pointer' }}>
                <Save size={16} /> Save Changes
              </button>
            </div>
            
            <div style={{ marginTop: '2.5rem', paddingTop: '1.5rem', borderTop: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
              <label style={{ fontSize: '0.95rem', fontWeight: '600', color: '#334155', textAlign: 'center' }}>Edit contact details</label>
              <button 
                type="button" 
                onClick={() => {
                  setActiveSidebar('global-contact');
                }}
                style={{ 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  background: '#e20002', 
                  color: '#ffffff', 
                  border: 'none', 
                  padding: '0.6rem 2.5rem', 
                  borderRadius: '6px', 
                  fontWeight: '600', 
                  fontSize: '0.95rem',
                  cursor: 'pointer',
                  boxShadow: '0 4px 6px -1px rgba(226, 0, 2, 0.2), 0 2px 4px -1px rgba(226, 0, 2, 0.1)'
                }}
              >
                Edit Contact
              </button>
            </div>
          </div>
        </div>
      );
    }

        if (activeSidebar === 'entertainment-blog' && activeSubMenu === 'blog') {
      const dbBlogs = content.entertainment?.blogs || [];
      const mergedStaticBlogs = staticBlogs.map(sb => {
        const override = dbBlogs.find(dbb => dbb.slug === sb.slug);
        return override ? { ...override, isStaticOrigin: true } : { ...sb, isStaticOrigin: true };
      });
      const newDbBlogs = dbBlogs.filter(dbb => !staticBlogs.some(sb => sb.slug === dbb.slug));
      const blogs = [...mergedStaticBlogs, ...newDbBlogs];

      const removeBlog = (idx) => {
        const blogToRemove = blogs[idx];
        if (blogToRemove.isStaticOrigin) return; 
        
        const dbIdx = dbBlogs.findIndex(b => b.slug === blogToRemove.slug);
        if (dbIdx === -1) return;

        if (window.confirm('Are you sure you want to delete this blog post?')) {
          const newState = JSON.parse(JSON.stringify(content));
          newState.entertainment.blogs.splice(dbIdx, 1);
          handleSave(newState);
        }
      };

      const togglePublish = (idx) => {
        const blogToToggle = blogs[idx];
        const newState = JSON.parse(JSON.stringify(content));
        
        const dbIdx = (newState.entertainment.blogs || []).findIndex(b => b.slug === blogToToggle.slug);
        
        if (dbIdx !== -1) {
          newState.entertainment.blogs[dbIdx].published = !newState.entertainment.blogs[dbIdx].published;
        } else {
          if (!newState.entertainment.blogs) newState.entertainment.blogs = [];
          newState.entertainment.blogs.push({ ...blogToToggle, published: !blogToToggle.published });
        }
        handleSave(newState);
      };

      const handleEditClick = (blog, idx) => {
        const dbIdx = (content.entertainment?.blogs || []).findIndex(b => b.slug === blog.slug);
        handleOpenAddBlogModal(blog, dbIdx !== -1 ? dbIdx : `static_${blog.slug}`);
      };

      return (
        <div className="editor-form-pane">
          <div className="form-header">
            <div>
              <h2>Entertainment Blog Settings</h2>
              <p>Manage blog posts and articles</p>
            </div>
            <div className="header-actions">
              <button type="button" className="btn-primary" onClick={() => handleSave(content)} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Save size={18} /> Save Changes
              </button>
            </div>
          </div>

          <div className="form-card">
            <h3 style={{ marginBottom: '1rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              Blog Posts
              <button type="button" className="btn-secondary" onClick={() => handleOpenAddBlogModal(null, null)} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', padding: '0.4rem 0.8rem' }}>
                <Plus size={14} /> Add Blog
              </button>
            </h3>
            
            <div className="blogs-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem', marginTop: '1.5rem' }}>
              {blogs.map((blog, idx) => {
                const isStaticOrigin = blog.isStaticOrigin;
                const isPublished = blog.published !== false;
                
                return (
                  <div key={blog.slug || idx} className="blog-card" style={{ border: '1px solid #e2e8f0', borderRadius: '8px', overflow: 'hidden', background: '#fff', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ height: '160px', overflow: 'hidden', position: 'relative' }}>
                      <img src={blog.imageUrl ? (blog.imageUrl.startsWith('http') ? blog.imageUrl : `http://localhost:5000${blog.imageUrl.startsWith('/') ? '' : '/'}${blog.imageUrl}`) : 'https://placehold.co/600x400?text=No+Image'} alt={blog.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      <div style={{ position: 'absolute', top: '10px', left: '10px', background: '#e20002', color: 'white', padding: '0.2rem 0.6rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 'bold' }}>
                        {blog.date ? new Date(blog.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }).toUpperCase() : ''}
                      </div>
                      <div style={{ position: 'absolute', top: '10px', right: '10px', background: isPublished ? '#10b981' : '#64748b', color: 'white', padding: '0.2rem 0.6rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 'bold' }}>
                        {isPublished ? 'PUBLISHED' : 'DRAFT'}
                      </div>
                    </div>
                    <div style={{ padding: '1.2rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <h4 style={{ fontSize: '1rem', fontWeight: '700', margin: '0 0 0.5rem 0', color: '#0f172a', lineHeight: '1.4' }}>{blog.title}</h4>
                      
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid #f1f5f9' }}>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <button 
                            className="btn-icon" 
                            onClick={() => handleEditClick(blog, idx)}
                            title="Edit Blog"
                          >
                            <Edit2 size={16} /> Edit
                          </button>
                          <button 
                            className={`btn-icon ${isStaticOrigin ? 'disabled' : ''}`} 
                            onClick={() => !isStaticOrigin && removeBlog(idx)}
                            disabled={isStaticOrigin}
                            title={isStaticOrigin ? "Cannot delete original static blogs" : "Delete Blog"}
                            style={isStaticOrigin ? { opacity: 0.3, cursor: 'not-allowed' } : {}}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="empty-editor">
        <FileText size={48} />
        <h2>Select a section to edit</h2>
        <p>Choose an item from the menu on the left to start editing content.</p>
      </div>
    );
  };

  return (
    <div className="cms-container">
      {/* Top Navbar Header */}
      <header className="top-navbar">
        <div className="logo-area">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>
          <h2>REDASH <span>ADMIN</span></h2>
        </div>

        <nav className="top-nav-tabs">
          <button className={`top-nav-tab ${activeSidebar === 'homepage' ? 'active' : ''}`} onClick={() => { 
            setActiveSidebar('homepage'); 
            setActiveSubMenu('hero'); 
            setDomain('redashfilms.com');
          }}>
            <Home size={16} /> Homepage
          </button>
          <button className={`top-nav-tab ${activeSidebar.startsWith('entertainment') ? 'active' : ''}`} onClick={() => {
            setActiveSidebar('entertainment');
            setActiveSubMenu('logo');
            setDomain('ent.redashfilms.com');
          }}>
            <Film size={16} /> Entertainment Films
          </button>
          <button className={`top-nav-tab ${activeSidebar === 'agency' ? 'active' : ''}`} onClick={() => {
            setActiveSidebar('agency');
            setDomain('agency.redashfilms.com');
          }}>
            <Briefcase size={16} /> Ad Agency
          </button>
          <button className={`top-nav-tab ${activeSidebar === 'homepage-media' ? 'active' : ''}`} onClick={() => setActiveSidebar('homepage-media')}>
            <ImageIcon size={16} /> Media Cards
          </button>
          <button className={`top-nav-tab ${activeSidebar === 'global-contact' ? 'active' : ''}`} onClick={() => setActiveSidebar('global-contact')}>
            <Mail size={16} /> Contact
          </button>
        </nav>

        <div className="user-profile-header">
          <div className="user-avatar">A</div>
          <div className="user-info">
            <span className="name">Admin User</span>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="cms-body">
        {/* Left Column: Section Menu */}
        <div className="section-menu">
          {renderSubMenu()}
        </div>

        {/* Right Column: Main Editor Area */}
        <main className="main-editor-area">
          {/* Topbar */}
          <header className="editor-topbar">
            <div className="topbar-left">
              {activeSidebar.startsWith('entertainment') && (
                <div className="cms-quick-links" style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: '600', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Navigate CMS:</span>
                  
                  <button 
                    onClick={() => { setActiveSidebar('entertainment'); setActiveSubMenu('hero'); }}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.5rem 0', color: activeSidebar === 'entertainment' ? '#e20002' : '#0f172a', borderBottom: activeSidebar === 'entertainment' ? '2px solid #e20002' : '2px solid transparent', fontSize: '0.9rem', fontWeight: '600', transition: 'all 0.2s' }}
                  >
                    Home
                  </button>
                  
                  <button 
                    onClick={() => { setActiveSidebar('entertainment-about'); setActiveSubMenu('aboutHero'); }}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.5rem 0', color: activeSidebar === 'entertainment-about' ? '#e20002' : '#0f172a', borderBottom: activeSidebar === 'entertainment-about' ? '2px solid #e20002' : '2px solid transparent', fontSize: '0.9rem', fontWeight: '600', transition: 'all 0.2s' }}
                  >
                    About
                  </button>
                  
                  <button 
                    onClick={() => { setActiveSidebar('entertainment-films'); setActiveSubMenu('filmsHero'); }}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.5rem 0', color: activeSidebar === 'entertainment-films' ? '#e20002' : '#0f172a', borderBottom: activeSidebar === 'entertainment-films' ? '2px solid #e20002' : '2px solid transparent', fontSize: '0.9rem', fontWeight: '600', transition: 'all 0.2s' }}
                  >
                    Entertainment Films
                  </button>
                  
                  <button 
                    onClick={() => { setActiveSidebar('entertainment-blog'); setActiveSubMenu('blog'); }}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.5rem 0', color: activeSidebar === 'entertainment-blog' ? '#e20002' : '#0f172a', borderBottom: activeSidebar === 'entertainment-blog' ? '2px solid #e20002' : '2px solid transparent', fontSize: '0.9rem', fontWeight: '600', transition: 'all 0.2s' }}
                  >
                    Blog
                  </button>
                  
                  <button 
                    onClick={() => { setActiveSidebar('entertainment-media'); setActiveSubMenu('media'); }}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.5rem 0', color: activeSidebar === 'entertainment-media' ? '#e20002' : '#0f172a', borderBottom: activeSidebar === 'entertainment-media' ? '2px solid #e20002' : '2px solid transparent', fontSize: '0.9rem', fontWeight: '600', transition: 'all 0.2s' }}
                  >
                    Media
                  </button>
                  
                  <button 
                    onClick={() => { setActiveSidebar('entertainment-contact'); setActiveSubMenu('contact'); }}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.5rem 0', color: activeSidebar === 'entertainment-contact' ? '#e20002' : '#0f172a', borderBottom: activeSidebar === 'entertainment-contact' ? '2px solid #e20002' : '2px solid transparent', fontSize: '0.9rem', fontWeight: '600', transition: 'all 0.2s' }}
                  >
                    Contact
                  </button>
                </div>
              )}
            </div>
            <div className="topbar-right">
            </div>
          </header>

          {/* Editor Grid */}
          <div className="editor-grid">
            {renderEditor()}
          </div>
        </main>
      </div>

      {/* Add Celebrity Modal Popup */}
      {showAddCelebModal && (
        <div className="modal-overlay" onClick={() => setShowAddCelebModal(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#0f172a', margin: 0 }}>Add New Celebrity</h3>
              <button className="btn-icon" onClick={() => setShowAddCelebModal(false)} style={{ color: '#64748b' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>

            <div className="modal-body">
              {/* Row Select */}
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: '600', display: 'block', marginBottom: '0.4rem', color: '#334155' }}>Select Target Row</label>
                <select 
                  className="form-control custom-select" 
                  value={newCeleb.rowKey}
                  onChange={(e) => setNewCeleb({ ...newCeleb, rowKey: e.target.value })}
                >
                  <option value="row1">Row 1 (Top Row — 9 celebs max recommended)</option>
                  <option value="row2">Row 2 (Bottom Row — Centered)</option>
                </select>
              </div>

              {/* Image Preview Box */}
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: '600', display: 'block', marginBottom: '0.4rem', color: '#334155' }}>Image Preview</label>
                <div style={{ width: '100%', height: '200px', background: '#f1f5f9', borderRadius: '8px', overflow: 'hidden', border: '1px solid #cbd5e1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {newCeleb.img ? (
                    <img src={newCeleb.img} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
                  ) : (
                    <div style={{ textAlign: 'center', color: '#94a3b8' }}>
                      <ImageIcon size={36} style={{ margin: '0 auto 0.4rem', opacity: 0.5 }} />
                      <span style={{ fontSize: '0.85rem', display: 'block' }}>No image selected</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Celebrity Name */}
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: '600', display: 'block', marginBottom: '0.4rem', color: '#334155' }}>Celebrity Name</label>
                <input 
                  type="text" 
                  className="form-control" 
                  value={newCeleb.name} 
                  onChange={(e) => setNewCeleb({ ...newCeleb, name: e.target.value })} 
                  placeholder="e.g. Ranbir Kapoor" 
                  autoFocus
                />
              </div>

              {/* Upload Image / Image URL */}
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: '600', display: 'block', marginBottom: '0.4rem', color: '#334155' }}>Upload Image / Image URL</label>
                <div style={{ display: 'flex', gap: '0.5rem', flexDirection: 'column' }}>
                  <input 
                    type="text" 
                    className="form-control" 
                    style={{ fontSize: '0.85rem' }}
                    value={newCeleb.img} 
                    onChange={(e) => setNewCeleb({ ...newCeleb, img: e.target.value })} 
                    placeholder="Paste image URL here..."
                  />
                  <label className="btn-secondary" style={{ padding: '0.6rem 1rem', fontSize: '0.85rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', background: '#e20002', color: '#ffffff', border: 'none', borderRadius: '6px', fontWeight: '600' }}>
                    <Upload size={16} /> Choose Image File
                    <input 
                      type="file" 
                      accept="image/*" 
                      style={{ display: 'none' }}
                      onChange={(e) => {
                        const file = e.target.files && e.target.files[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => setNewCeleb({ ...newCeleb, img: reader.result });
                          reader.readAsDataURL(file);
                        }
                      }} 
                    />
                  </label>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button type="button" className="btn-secondary" onClick={() => setShowAddCelebModal(false)}>
                Cancel
              </button>
              <button type="button" className="btn-primary" onClick={handleConfirmAddCelebModal} style={{ background: '#e20002', border: 'none', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Plus size={16} /> Add Celebrity
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Client Modal Popup */}
      {showAddClientModal && (
        <div className="modal-overlay" onClick={() => setShowAddClientModal(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#0f172a', margin: 0 }}>Add New Client / Partner</h3>
              <button className="btn-icon" onClick={() => setShowAddClientModal(false)} style={{ color: '#64748b' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>

            <div className="modal-body">
              {/* Image Preview Box */}
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: '600', display: 'block', marginBottom: '0.4rem', color: '#334155' }}>Logo Preview</label>
                <div style={{ width: '100%', height: '180px', background: '#f8fafc', borderRadius: '8px', overflow: 'hidden', border: '1px solid #cbd5e1', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
                  {newClient.img ? (
                    <img src={newClient.img} alt="Preview" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                  ) : (
                    <div style={{ textAlign: 'center', color: '#94a3b8' }}>
                      <ImageIcon size={36} style={{ margin: '0 auto 0.4rem', opacity: 0.5 }} />
                      <span style={{ fontSize: '0.85rem', display: 'block' }}>No logo selected</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Upload Image / Image URL */}
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: '600', display: 'block', marginBottom: '0.4rem', color: '#334155' }}>Upload Logo / Image URL</label>
                <div style={{ display: 'flex', gap: '0.5rem', flexDirection: 'column' }}>
                  <input 
                    type="text" 
                    className="form-control" 
                    style={{ fontSize: '0.85rem' }}
                    value={newClient.img} 
                    onChange={(e) => setNewClient({ ...newClient, img: e.target.value })} 
                    placeholder="Paste image URL here..."
                  />
                  <label className="btn-secondary" style={{ padding: '0.6rem 1rem', fontSize: '0.85rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', background: '#e20002', color: '#ffffff', border: 'none', borderRadius: '6px', fontWeight: '600' }}>
                    <Upload size={16} /> Choose Logo File
                    <input 
                      type="file" 
                      accept="image/*" 
                      style={{ display: 'none' }}
                      onChange={(e) => {
                        const file = e.target.files && e.target.files[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => setNewClient({ ...newClient, img: reader.result });
                          reader.readAsDataURL(file);
                        }
                      }} 
                    />
                  </label>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button type="button" className="btn-secondary" onClick={() => setShowAddClientModal(false)}>
                Cancel
              </button>
              <button type="button" className="btn-primary" onClick={handleConfirmAddClientModal} style={{ background: '#e20002', border: 'none', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Plus size={16} /> Add Client
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Red Hot Card Modal Popup */}
      {showAddRedHotModal && (
        <div className="modal-overlay" onClick={() => setShowAddRedHotModal(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '500px' }}>
            <div className="modal-header">
              <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#0f172a', margin: 0 }}>Add Red Hot Section Card</h3>
              <button className="btn-icon" onClick={() => setShowAddRedHotModal(false)} style={{ color: '#64748b' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>

            <div className="modal-body">
              {/* Image Preview Box */}
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: '600', display: 'block', marginBottom: '0.4rem', color: '#334155' }}>Poster / Image Preview</label>
                <div style={{ width: '100%', height: '180px', background: '#f8fafc', borderRadius: '8px', overflow: 'hidden', border: '1px solid #cbd5e1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {newRedHotCard.image ? (
                    <img src={newRedHotCard.image} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <div style={{ textAlign: 'center', color: '#94a3b8' }}>
                      <ImageIcon size={36} style={{ margin: '0 auto 0.4rem', opacity: 0.5 }} />
                      <span style={{ fontSize: '0.85rem', display: 'block' }}>No image selected</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Title */}
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: '600', display: 'block', marginBottom: '0.4rem', color: '#334155' }}>Card Title</label>
                <input 
                  type="text" 
                  className="form-control" 
                  value={newRedHotCard.title} 
                  onChange={(e) => setNewRedHotCard({ ...newRedHotCard, title: e.target.value })} 
                  placeholder="e.g. THE CODPASTER" 
                  autoFocus
                />
              </div>

              {/* Description */}
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: '600', display: 'block', marginBottom: '0.4rem', color: '#334155' }}>Description / Subtitle</label>
                <textarea 
                  className="form-control" 
                  rows={2}
                  value={newRedHotCard.subtitle} 
                  onChange={(e) => setNewRedHotCard({ ...newRedHotCard, subtitle: e.target.value })} 
                  placeholder="e.g. Produced the world's first fiction web series..." 
                />
              </div>

              {/* Upload Image / Image URL */}
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: '600', display: 'block', marginBottom: '0.4rem', color: '#334155' }}>Upload Image / Poster URL</label>
                <div style={{ display: 'flex', gap: '0.5rem', flexDirection: 'column' }}>
                  <input 
                    type="text" 
                    className="form-control" 
                    style={{ fontSize: '0.85rem' }}
                    value={newRedHotCard.image} 
                    onChange={(e) => setNewRedHotCard({ ...newRedHotCard, image: e.target.value })} 
                    placeholder="Paste poster image URL here..."
                  />
                  <label className="btn-secondary" style={{ padding: '0.6rem 1rem', fontSize: '0.85rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', background: '#e20002', color: '#ffffff', border: 'none', borderRadius: '6px', fontWeight: '600' }}>
                    <Upload size={16} /> Choose Poster File
                    <input 
                      type="file" 
                      accept="image/*" 
                      style={{ display: 'none' }}
                      onChange={(e) => {
                        const file = e.target.files && e.target.files[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => setNewRedHotCard({ ...newRedHotCard, image: reader.result });
                          reader.readAsDataURL(file);
                        }
                      }} 
                    />
                  </label>
                </div>
              </div>

              {/* Badges / Links */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: '600', display: 'block', marginBottom: '0.3rem', color: '#334155' }}>Badge 1 Text</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    style={{ fontSize: '0.85rem' }}
                    value={newRedHotCard.badge1Text} 
                    onChange={(e) => setNewRedHotCard({ ...newRedHotCard, badge1Text: e.target.value })} 
                    placeholder="e.g. Mid-Day"
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: '600', display: 'block', marginBottom: '0.3rem', color: '#334155' }}>Badge 1 URL</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    style={{ fontSize: '0.85rem' }}
                    value={newRedHotCard.badge1Url} 
                    onChange={(e) => setNewRedHotCard({ ...newRedHotCard, badge1Url: e.target.value })} 
                    placeholder="https://... or #"
                  />
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button type="button" className="btn-secondary" onClick={() => setShowAddRedHotModal(false)}>
                Cancel
              </button>
              <button type="button" className="btn-primary" onClick={handleConfirmAddRedHotModal} style={{ background: '#e20002', border: 'none', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Plus size={16} /> Add Red Hot Card
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Project Card Modal Popup */}
      {showAddProjectModal && (
        <div className="modal-overlay" onClick={() => setShowAddProjectModal(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '500px' }}>
            <div className="modal-header">
              <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#0f172a', margin: 0 }}>
                Add New {projectCardType === 'horizontal' ? 'Horizontal (16:9)' : 'Vertical (3:4)'} Project Card
              </h3>
              <button className="btn-icon" onClick={() => setShowAddProjectModal(false)} style={{ color: '#64748b' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>

            <div className="modal-body">
              {/* Image Preview */}
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: '600', display: 'block', marginBottom: '0.4rem', color: '#334155' }}>Poster / Image Preview</label>
                <div style={{ width: '100%', height: projectCardType === 'horizontal' ? '170px' : '220px', background: '#f8fafc', borderRadius: '8px', overflow: 'hidden', border: '1px solid #cbd5e1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {newProjectCard.image ? (
                    <img src={newProjectCard.image} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <div style={{ textAlign: 'center', color: '#94a3b8' }}>
                      <span style={{ fontSize: '0.85rem', display: 'block' }}>No image selected</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Upload Image / Poster URL */}
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: '600', display: 'block', marginBottom: '0.4rem', color: '#334155' }}>Upload Image / Poster URL</label>
                <div style={{ display: 'flex', gap: '0.5rem', flexDirection: 'column' }}>
                  <input 
                    type="text" 
                    className="form-control" 
                    style={{ fontSize: '0.85rem' }}
                    value={newProjectCard.image} 
                    onChange={(e) => setNewProjectCard({ ...newProjectCard, image: e.target.value })} 
                    placeholder="Paste poster image URL here..."
                  />
                  <label className="btn-secondary" style={{ padding: '0.6rem 1rem', fontSize: '0.85rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', background: '#e20002', color: '#ffffff', border: 'none', borderRadius: '6px', fontWeight: '600' }}>
                    <Upload size={16} /> Choose Image File
                    <input 
                      type="file" 
                      accept="image/*" 
                      style={{ display: 'none' }}
                      onChange={(e) => {
                        const file = e.target.files && e.target.files[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => setNewProjectCard({ ...newProjectCard, image: reader.result });
                          reader.readAsDataURL(file);
                        }
                      }} 
                    />
                  </label>
                </div>
              </div>

              {/* Link */}
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: '600', display: 'block', marginBottom: '0.4rem', color: '#334155' }}>Target Link / Video URL</label>
                <input 
                  type="text" 
                  className="form-control" 
                  value={newProjectCard.link} 
                  onChange={(e) => {
                    const newLink = e.target.value;
                    const ytId = extractYouTubeId(newLink);
                    if (ytId && !newProjectCard.image) {
                      setNewProjectCard({ ...newProjectCard, link: newLink, image: `https://img.youtube.com/vi/${ytId}/maxresdefault.jpg` });
                    } else {
                      setNewProjectCard({ ...newProjectCard, link: newLink });
                    }
                  }} 
                  placeholder="https://... or #" 
                  autoFocus
                />
              </div>
            </div>

            <div className="modal-footer">
              <button type="button" className="btn-secondary" onClick={() => setShowAddProjectModal(false)}>
                Cancel
              </button>
              <button type="button" className="btn-primary" onClick={handleConfirmAddProjectModal} style={{ background: '#e20002', border: 'none', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Plus size={16} /> Add Project Card
              </button>
            </div>
          </div>
        </div>
      )}

      
      {/* ADD BLOG MODAL */}
      {showAddBlogModal && (
        <div className="modal-overlay" onClick={() => setShowAddBlogModal(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()} style={{ width: '90vw', maxWidth: '1200px', height: '90vh', display: 'flex', flexDirection: 'column' }}>
            <div className="modal-header">
              <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#0f172a', margin: 0 }}>Add New Blog</h3>
              <button className="btn-icon" onClick={() => setShowAddBlogModal(false)} style={{ color: '#64748b' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>
            <div className="modal-body" style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
              <div className="form-group" style={{ marginBottom: '1.2rem' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: '600', display: 'block', marginBottom: '0.4rem', color: '#334155' }}>Blog Title *</label>
                <input 
                  type="text" 
                  className="form-control" 
                  value={newBlog.title || ''} 
                  onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })} 
                  placeholder="Enter blog title"
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.2rem' }}>
                <div className="form-group">
                  <label style={{ fontSize: '0.85rem', fontWeight: '600', display: 'block', marginBottom: '0.4rem', color: '#334155' }}>Slug (Optional)</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    value={newBlog.slug || ''} 
                    onChange={(e) => setNewBlog({ ...newBlog, slug: e.target.value })} 
                    placeholder="custom-url-slug"
                  />
                </div>
                <div className="form-group">
                  <label style={{ fontSize: '0.85rem', fontWeight: '600', display: 'block', marginBottom: '0.4rem', color: '#334155' }}>Date</label>
                  <input 
                    type="date" 
                    className="form-control" 
                    value={newBlog.date || ''} 
                    onChange={(e) => setNewBlog({ ...newBlog, date: e.target.value })} 
                  />
                </div>
              </div>

              <div className="form-group" style={{ marginBottom: '1.2rem' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: '600', display: 'block', marginBottom: '0.4rem', color: '#334155' }}>Cover Image</label>
                <div style={{ display: 'flex', gap: '0.5rem', flexDirection: 'column' }}>
                  <input 
                    type="text" 
                    className="form-control" 
                    style={{ fontSize: '0.85rem' }}
                    value={newBlog.imageUrl || ''} 
                    onChange={(e) => setNewBlog({ ...newBlog, imageUrl: e.target.value })} 
                    placeholder="Paste image URL or upload..."
                  />
                  <label className="btn-secondary" style={{ padding: '0.6rem 1rem', fontSize: '0.85rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', background: '#e20002', color: '#ffffff', border: 'none', borderRadius: '6px', fontWeight: '600' }}>
                    <Upload size={16} /> Choose Image File
                    <input 
                      type="file" 
                      accept="image/*" 
                      style={{ display: 'none' }}
                      onChange={async (e) => {
                        const file = e.target.files && e.target.files[0];
                        if (file) {
                          const formData = new FormData();
                          formData.append('image', file);
                          try {
                            const res = await fetch('http://localhost:5000/api/upload', { method: 'POST', body: formData });
                            const data = await res.json();
                            if (res.ok && data.url) {
                              setNewBlog({ ...newBlog, imageUrl: data.url });
                            } else {
                              alert('Error uploading file');
                            }
                          } catch (error) {
                            console.error("Upload error:", error);
                            alert('Error uploading file');
                          }
                        }
                      }} 
                    />
                  </label>
                </div>
                {newBlog.imageUrl && (
                  <div style={{ marginTop: '0.5rem', width: '100%', height: '120px', borderRadius: '6px', overflow: 'hidden' }}>
                    <img src={newBlog.imageUrl.startsWith('http') ? newBlog.imageUrl : `http://localhost:5000${newBlog.imageUrl.startsWith('/') ? '' : '/'}${newBlog.imageUrl}`} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                )}
              </div>

              <div className="form-group" style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: '400px' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: '600', display: 'block', marginBottom: '0.4rem', color: '#334155' }}>Main article body</label>
                <div style={{ flex: 1, overflow: 'hidden' }}>
                  <JoditEditor
                    value={newBlog.content || ''}
                    config={JODIT_BLOG_CONFIG}
                    onBlur={newContent => setNewBlog({ ...newBlog, content: newContent })}
                    onChange={() => {}}
                  />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn-secondary" onClick={() => setShowAddBlogModal(false)}>
                Cancel
              </button>
              <button type="button" className="btn-primary" onClick={handleConfirmAddBlogModal} style={{ background: '#e20002', border: 'none', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Save size={16} /> Save Blog Post
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ADD MEDIA MODAL */}
      {showAddMediaModal && (
        <div className="modal-overlay" onClick={() => setShowAddMediaModal(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()} style={{ width: '90vw', maxWidth: '1200px', height: '90vh', display: 'flex', flexDirection: 'column' }}>
            <div className="modal-header">
              <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#0f172a', margin: 0 }}>Add New Media Coverage</h3>
              <button className="btn-icon" onClick={() => setShowAddMediaModal(false)} style={{ color: '#64748b' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>
            <div className="modal-body" style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.2rem' }}>
                <div className="form-group">
                  <label style={{ fontSize: '0.85rem', fontWeight: '600', display: 'block', marginBottom: '0.4rem', color: '#334155' }}>Source/Publisher (e.g. Times of India) *</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    value={newMedia.source || ''} 
                    onChange={(e) => setNewMedia({ ...newMedia, source: e.target.value })} 
                    placeholder="Enter publisher name"
                  />
                </div>
                <div className="form-group">
                  <label style={{ fontSize: '0.85rem', fontWeight: '600', display: 'block', marginBottom: '0.4rem', color: '#334155' }}>Article URL</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    value={newMedia.url || ''} 
                    onChange={(e) => setNewMedia({ ...newMedia, url: e.target.value })} 
                    placeholder="https://..."
                  />
                </div>
              </div>

              <div className="form-group" style={{ marginBottom: '1.2rem' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: '600', display: 'block', marginBottom: '0.4rem', color: '#334155' }}>Article Title *</label>
                <input 
                  type="text" 
                  className="form-control" 
                  value={newMedia.title || ''} 
                  onChange={(e) => setNewMedia({ ...newMedia, title: e.target.value })} 
                  placeholder="Enter article title"
                />
              </div>

              <div className="form-group" style={{ marginBottom: '1.2rem' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: '600', display: 'block', marginBottom: '0.4rem', color: '#334155' }}>Cover Image</label>
                <div style={{ display: 'flex', gap: '0.5rem', flexDirection: 'column' }}>
                  <input 
                    type="text" 
                    className="form-control" 
                    style={{ fontSize: '0.85rem' }}
                    value={newMedia.image || ''} 
                    onChange={(e) => setNewMedia({ ...newMedia, image: e.target.value })} 
                    placeholder="Paste image URL or upload..."
                  />
                  <label className="btn-secondary" style={{ padding: '0.6rem 1rem', fontSize: '0.85rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', background: '#e20002', color: '#ffffff', border: 'none', borderRadius: '6px', fontWeight: '600' }}>
                    <Upload size={16} /> Choose Image File
                    <input 
                      type="file" 
                      accept="image/*" 
                      style={{ display: 'none' }}
                      onChange={async (e) => {
                        const file = e.target.files && e.target.files[0];
                        if (file) {
                          const formData = new FormData();
                          formData.append('image', file);
                          try {
                            const res = await fetch('http://localhost:5000/api/upload', { method: 'POST', body: formData });
                            const data = await res.json();
                            if (res.ok && data.url) {
                              setNewMedia({ ...newMedia, image: data.url });
                            } else {
                              alert('Error uploading file');
                            }
                          } catch (error) {
                            console.error("Upload error:", error);
                            alert('Error uploading file');
                          }
                        }
                      }} 
                    />
                  </label>
                </div>
                {newMedia.image && (
                  <div style={{ marginTop: '0.5rem', width: '100%', height: '120px', borderRadius: '6px', overflow: 'hidden' }}>
                    <img src={newMedia.image.startsWith('http') ? newMedia.image : `http://localhost:5000${newMedia.image.startsWith('/') ? '' : '/'}${newMedia.image}`} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                )}
              </div>
              
              <div className="form-group" style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: '300px' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: '600', display: 'block', marginBottom: '0.4rem', color: '#334155' }}>Article Summary / Description</label>
                <div style={{ flex: 1, overflow: 'hidden' }}>
                  <JoditEditor
                    value={newMedia.description || ''}
                    config={JODIT_MEDIA_CONFIG}
                    onBlur={newContent => setNewMedia({ ...newMedia, description: newContent })}
                    onChange={() => {}}
                  />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn-secondary" onClick={() => setShowAddMediaModal(false)}>
                Cancel
              </button>
              <button type="button" className="btn-primary" onClick={handleConfirmAddMediaModal} style={{ background: '#e20002', border: 'none', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Save size={16} /> Save Media
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toast.show && (
        <div className={`toast-notification ${toast.type}`}>
          <div className="toast-icon">
            {toast.type === 'success' ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>
            )}
          </div>
          <span>{toast.message}</span>
          <button className="toast-close" onClick={() => setToast({ ...toast, show: false })}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
