/* style.js  (or styles/index.js) */

import { text } from "framer-motion/client";

export const COLORS = {
  primary: "#2E2E2E", // deep blue
  secondary: "#FF6D00", // green accent
  white: "#ffffff",
  black: "#000000",

  // neutrals / greys used in the UI
  neutralBg: "#f3f4f6",
  greyLight: "#d1d5db",
  greyTrack: "#e0e0e0",
  greyThumb: "#999999",

  // extra accent colours seen in the layout
  accentBlue: "#0284c7",
  navyBg: "#0a2b4c",
  slate700: "#475569",
  slate600: "#64748b",

  // component‑specific backgrounds
  lightBg: "#C3CAD1",
  heroSideBg: "#b0b0b0",
};

const style = {
  /* ───────────────────── Hero Section ───────────────────── */
  heroSection: {
    heroContainer: {
      backgroundColor: COLORS.primary,
      display: "flex",
      flexDirection: { xs: "column", md: "row" },
      minHeight: { xs: "auto", md: 500 },
      // fontFamily:
      //   'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif',
    },
    leftSection: {
      backgroundColor: COLORS.primary,
      color: COLORS.white,
      flex: 1,
      px: { xs: 3, md: 6 },
      py: { xs: 5, md: 8 },
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    },
    title: {
       fontSize: { xs: "32px", md: "48px" },
      fontWeight: "bold",
      lineHeight: 1.1,
      mb: 3,
      background: "linear-gradient(135deg, #ffff 0%, #FF6D00 50%, #ffff 100%)",
      backgroundClip: "text",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      position: "relative",
      animation: "textGlow 2s ease-in-out infinite alternate",
    },
    description: {
      fontSize: "16px",
      lineHeight: 1.5,
      mb: 4,
      maxWidth: 500,
      opacity: 0.9,
    },
    // button: {
    //   bgcolor: COLORS.secondary,
    //   color: COLORS.white,
    //   fontSize: "14px",
    //   fontWeight: 600,
    //   px: 3,
    //   py: 1.5,
    //   textTransform: "uppercase",
    //   borderRadius: 1,
    //   width: "fit-content",
    //   "&:hover": { bgcolor: "#059669" },
    // },
    button: {
      bgcolor: "transparent",
      color: "#ffffff",
      fontSize: "14px",
      fontWeight: 400,
      px: 3,
      py: 1.5,
      textTransform: "uppercase",
      borderRadius: 5,
      width: "fit-content",
      position: "relative",
      overflow: "hidden",
      border: "2px solid transparent",
      background: "linear-gradient(135deg, #FF6D00	 0%, #FF6D00	 100%)",
      backgroundClip: "padding-box",
      transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
      "&::before": {
        content: '""',
        position: "absolute",
        top: 0,
        left: "-100%",
        width: "100%",
        height: "100%",
        background: "linear-gradient(90deg, transparent, #FF6D00, transparent)",
        transition: "left 0.6s",
      },
      "&:hover": {
        transform: "translateY(-3px) scale(1.05)",
        boxShadow: "0 5px 10px #FF6D00",
        background: "linear-gradient(135deg, #FF6D00	 0%, #FF6D00	 100%)",
        "&::before": {
          left: "100%",
        },
        "&::after": {
          transform: "translateY(-50%) translateX(5px)",
        },
      },
      "&:active": {
        transform: "translateY(-1px) scale(1.02)",
      },
    },
    rightSection: {
      backgroundColor: COLORS.primary,
      flex: 1,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderTopLeftRadius: { xs: 0, md: "80px" },
      borderBottomLeftRadius: { xs: 0, md: "80px" },
      mt: { xs: 3, md: 0 },
      minHeight: { xs: 200, md: "auto" },
      overflow: "hidden",
    },
    heroImage: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      display: "block",
      maxHeight: { xs: 250, md: "100%" },
    },
  },

  /* ─────────────────── Home Service Cards ────────────────── */
  homeServiceCards: {
    wrapper: {
      backgroundColor: "#FAF9F6",
      py: 6,
      px: 2,
      mt: 2,
    },
    heading: {
      color: "#1A1A1A",
      fontWeight: "bold",
      fontSize:  { xs: "32px", md: "48px" },
      background: `linear-gradient(135deg, ${COLORS.primary} 46%, #FF6D00 20%)`,
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
    },
    scrollContainer: {
      display: "flex",
      overflowX: "auto",
      gap: 2,
      px: 1,
      mt: 4,
      pb: "5px",
      scrollbarWidth: "auto",
      "&::-webkit-scrollbar": {
        mt: 2,
        height: "8px",
      },
      "&::-webkit-scrollbar-thumb": {
        background: 'linear-gradient(45deg, #0C2F58, #1a5490)',
        mt: 2,
        borderRadius: "4px",
      },
      "&::-webkit-scrollbar-track": {
        backgroundColor: COLORS.greyTrack,
      },
    },
    card: {
      minWidth: 300,
      maxWidth: 300,
      height: 300,
      borderRadius: 2,
      p: 2,
      flexShrink: 0,
      position: "relative",
      overflow: "hidden",
      backgroundColor: "#F0F0F0",
      boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  
      "&::after": {
        content: '""',
        position: "absolute",
        bottom: "-100%",
        left: 0,
        width: "100%",
        height: "65%",
        background: "linear-gradient(to top, #2E2E2E, #2E2E2E)",
        borderTopLeftRadius: "80% 20%",
        borderTopRightRadius: "80% 20%",
        zIndex: 1,
        transition: "bottom 0.5s ease-in-out",
      },
  
      "&:hover::after": {
        bottom: "0%",
      },
  
      "&:hover": {
        transform: "translateY(-8px) scale(1.02)",
        boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
  
        "& .avatar": {
          transform: "scale(1.1) rotate(5deg)",
        },
        "& .arrow": {
          transform: "translateX(8px)",
        },
        "& .card-title, & .card-description, & .card-link": {
          color: "#ffffff !important",
          WebkitTextFillColor: "#ffffff !important",
          background: "none !important",
        },
      },
    },
    avatar: {
      width: 64,
      height: 64,
      bgcolor: COLORS.greyLight,
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    },
    cardTitle: {
      fontSize: { xs: "32px", md: "48px" },
      fontWeight: "bold",
      background: 'linear-gradient(45deg, #757575, #757575)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
    },
    cardDescription: {
      color: "#757575",
      fontSize: "14px",
      lineHeight: 1.6,
    },
    link: {
      display: "inline-flex",
      alignItems: "center",
      fontSize: "14px",
      fontWeight: 400,
      color: "#E65100",
      textTransform: "lowercase",
      position: "relative",
      overflow: "hidden",
      "&::before": {
        content: '""',
        position: "absolute",
        top: 0,
        left: "-100%",
        width: "100%",
        height: "100%",
        background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)",
        transition: "left 0.6s",
      },
      "&:hover::before": {
        left: "100%",
      },
    },
    loadingSpinner: {
      width: 40,
      height: 40,
      border: "4px solid #f3f3f3",
      borderTop: "4px solid #0C2F58",
      borderRadius: "50%",
      animation: "spin 1s linear infinite",
      "@keyframes spin": {
        "0%": { transform: "rotate(0deg)" },
        "100%": { transform: "rotate(360deg)" },
      },
    },
    loadingContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "200px",
    },
    arrowIcon: {
      fontSize: "14px",
      ml: 0.5,
      transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    },
  },
  
  /* ───────────────────── Feature Section ─────────────────── */
  featureSection: {
    wrapper: {
      bgcolor: COLORS.primary,
      color: COLORS.white,
      py: 6,
      px: 2,
      mt: 5,
    },
    heading: {
      fontSize: { xs: "32px", md: "48px" },
      fontWeight: "bold",
      textAlign:"center",
      lineHeight: 1.1,
      mb: 3,
      background: "linear-gradient(135deg, #ffff 50%, #FF6D00 50%, #ffff 100%)",
      backgroundClip: "text",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      position: "relative",
      animation: "textGlow 2s ease-in-out infinite alternate",
    },
    gridItemWrapper: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    iconCircle: {
      width: 80,
      height: 80,
      borderRadius: "50%",
      bgcolor: "#d9d9d9",
      mb: 2,
    },
    itemText: {
      textAlign: "center",
      fontSize: "14px",
      lineHeight: 1.4,
    },
  },

  /* ─────────────────── Home About Section ────────────────── */
  homeAboutSection: {
    wrapper: {
      background:COLORS.primary,
      mt: 0,
      mb:3,
      display: "flex",
      flexDirection: { xs: "column", md: "row" },
      minHeight: { xs: "auto", md: 500 },
      // fontFamily:
      //   'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif',
      borderRadius: 4,
      overflow: "hidden",
      position: "relative",
    },
    leftSection: {
      color: "#ffffff",
      flex: 1,
      px: { xs: 4, md: 8 },
      py: { xs: 6, md: 10 },
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      position: "relative",
      zIndex: 2,
      backdropFilter: "blur(20px)",
    },
    title: {
      fontSize: { xs: "32px", md: "48px" },
      fontWeight: "bold",
      lineHeight: 1.1,
      mb: 3,
      background: "linear-gradient(135deg, #ffff 0%, #FF6D00 50%, #ffff 100%)",
      backgroundClip: "text",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      position: "relative",
      animation: "textGlow 2s ease-in-out infinite alternate",
      "&::after": {
        content: '""',
        position: "absolute",
        bottom: -12,
        left: 0,
        width: "80px",
        height: "4px",
        background: "linear-gradient(135deg, #ffff 50%, #FF6D00 50%, #ffff 100%)",
        borderRadius: "2px",
        animation: "lineGrow 1s ease-out 0.5s both",
      },
      "@keyframes textGlow": {
        "0%": { filter: "brightness(1)" },
        "100%": { filter: "brightness(1.2)" },
      },
      "@keyframes lineGrow": {
        "0%": { width: "0px" },
        "100%": { width: "80px" },
      },
    },
    description: {
      fontSize: "14px",
      lineHeight: 1.8,
      mb: 5,
      color: "#ffff",
      fontWeight: 400,
      maxWidth: "85%",
      position: "relative",
      animation: "fadeInUp 1s ease-out 0.8s both",
      "&::before": {
        content: '"✨"',
        position: "absolute",
        left: -30,
        top: 0,
        fontSize: "17px",
        animation: "sparkle 2s ease-in-out infinite",
      },
      "@keyframes fadeInUp": {
        "0%": { opacity: 0, transform: "translateY(30px)" },
        "100%": { opacity: 1, transform: "translateY(0)" },
      },
      "@keyframes sparkle": {
        "0%, 100%": { transform: "scale(1) rotate(0deg)" },
        "50%": { transform: "scale(1.2) rotate(180deg)" },
      },
    },
    button: {
      bgcolor: "transparent",
      color: "#ffffff",
      fontSize: "14px",
      fontWeight: 400,
      px: 5,
      py: 2.5,
      textTransform: "uppercase",
      borderRadius: 5,
      width: "fit-content",
      position: "relative",
      overflow: "hidden",
      border: "2px solid transparent",
      background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
      backgroundClip: "padding-box",
      boxShadow: "0 10px 30px rgba(16, 185, 129, 0.4)",
      transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
      animation: "buttonPulse 2s ease-in-out infinite",
      "&::before": {
        content: '""',
        position: "absolute",
        top: 0,
        left: "-100%",
        width: "100%",
        height: "100%",
        background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
        transition: "left 0.6s",
      },
      "&::after": {
        content: '"→"',
        position: "absolute",
        right: 20,
        top: "50%",
        transform: "translateY(-50%)",
        fontSize: "18px",
        transition: "transform 0.3s ease",
      },
      "&:hover": {
        transform: "translateY(-3px) scale(1.05)",
        boxShadow: "0 20px 40px rgba(16, 185, 129, 0.6)",
        background: "linear-gradient(135deg, #059669 0%, #047857 100%)",
        "&::before": {
          left: "100%",
        },
        "&::after": {
          transform: "translateY(-50%) translateX(5px)",
        },
      },
      "&:active": {
        transform: "translateY(-1px) scale(1.02)",
      },
      "@keyframes buttonPulse": {
        "0%, 100%": { boxShadow: "0 10px 30px rgba(16, 185, 129, 0.4)" },
        "50%": { boxShadow: "0 15px 35px rgba(16, 185, 129, 0.6)" },
      },
    },
    rightSection: {
      backgroundColor: COLORS.heroSideBg,
      flex: 1,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      mt: { xs: 3, md: 0 },
      minHeight: { xs: 200, md: "auto" },
      overflow: "hidden",
    },
    heroImage: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      display: "block",
      maxHeight: { xs: 250, md: "100%" },
      position: "relative",
      zIndex: 2,
      borderRadius: 3,
      transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
      filter: "brightness(1.1) contrast(1.1) saturate(1.1)",
      boxShadow: "0 15px 35px rgba(0, 0, 0, 0.1)",
      "&:hover": {
        transform: "scale(1.08) rotate(1deg)",
        boxShadow: "0 25px 50px rgba(0, 0, 0, 0.2)",
        filter: "brightness(1.15) contrast(1.15) saturate(1.2)",
      },
    },
  },
  /* ────────────────── Testimonial Section ────────────────── */
  testimonialSection: {
    wrapper: {
      py: { xs: 8, md: 12 },
      px: { xs: 2, md: 4 },
    background: `linear-gradient(135deg, #F0F0F0 0%, #F0F0F1 100%)`,
      position: "relative",
      overflow: "hidden",
    },
    headline: {
        fontSize: { xs: "32px", md: "48px" },
       fontWeight: "bold",
       lineHeight: 1.1,
       mb: 3,
       background: `linear-gradient(135deg, ${COLORS.primary} 50%, #FF6D00 20%)`,
       backgroundClip: "text",
       WebkitBackgroundClip: "text",
       WebkitTextFillColor: "transparent",
       position: "relative",
       animation: "textGlow 2s ease-in-out infinite alternate",
       textAlign:"center",     
      letterSpacing: "-0.02em",
    },
    paper: {
      p: { xs: 2, md: 2.5 },
      height: "100%",
      color:"#fff",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
      position: "relative",
      overflow: "hidden",
      borderRadius: 4,
      background: "linear-gradient(135deg, #f1f1f1 0%, #FF6D00 70%, #000 100%)",
      backdropFilter: "blur(20px)",
      border: "1px solid rgba(255, 255, 255, 0.3)",
      boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.2)",
      transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
      "&::before": {
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: "4px",
        background: "linear-gradient(90deg, #000 40%, #FF6D00 50%, #fff 100%)",
        transform: "scaleX(0)",
        transformOrigin: "left",
        transition: "transform 0.3s ease",
      },
      "&::after": {
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "linear-gradient(135deg, rgba(16, 185, 129, 0.05) 0%, rgba(30, 58, 138, 0.05) 100%)",
        opacity: 0,
        transition: "opacity 0.3s ease",
        pointerEvents: "none",
      },
      "&:hover": {
        transform: "translateY(-8px)",
        boxShadow: "0 30px 60px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.3)",
        "&::before": {
          transform: "scaleX(1)",
        },
        "&::after": {
          opacity: 1,
        },
      },
    },
    quoteIcon: {
      fontSize: { xs: 16, md: 18 },
      color: "#000",
      mb: 2,
      position: "relative",
      zIndex: 2,
      filter: "drop-shadow(0 #FF6D00 4px 8px )",
      animation: "testimonialQuoteFloat 3s ease-in-out infinite",
      "@keyframes testimonialQuoteFloat": {
        "0%, 100%": { transform: "translateY(0px)" },
        "50%": { transform: "translateY(-4px)" },
      },
    },
    quoteText: {
      fontSize: { xs: "14px", md: "16px" },
      lineHeight: 1.6,
      color: "#000",
      mb: 2,
      position: "relative",
      zIndex: 2,
      fontStyle: "italic",
      "&::before": {
        content: '""',
        position: "absolute",
        left: -20,
        top: 0,
        width: "3px",
        height: "100%",
        borderRadius: "2px",
      },
    },
    avatar: {
      width: { xs: 48, md: 56 },
      height: { xs: 48, md: 56 },
      mb: 1.5,
      position: "relative",
      zIndex: 2,
      border: "2px solid #fff",
      boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15), 0 0 0 2px rgba(16, 185, 129, 0.2)",
      transition: "all 0.3s ease",
      "&:hover": {
        transform: "scale(1.1)",
        boxShadow: "0 12px 32px rgba(0, 0, 0, 0.2), 0 0 0 3px rgba(16, 185, 129, 0.4)",
      },
      "&::before": {
        content: '""',
        position: "absolute",
        top: -6,
        left: -6,
        right: -6,
        bottom: -6,
        background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
        borderRadius: "50%",
        opacity: 0,
        transition: "opacity 0.3s ease",
        zIndex: -1,
      },
      "&:hover::before": {
        opacity: 0.2,
      },
    },
    name: {
      fontSize: { xs: "14px", md: "16px" },
      fontWeight: 400,
      color: "#000",
      mb: 0.5,
      position: "relative",
      zIndex: 2,
    },
    title: {
      fontSize:  { xs: "14px", md: "16px" },
      color: "#000",
      mb: 1.5,
      position: "relative",
      zIndex: 2,
      fontWeight: "bold",
    },
    stars: {
      justifyContent: "center",
      mt: "auto",
      position: "relative",
      zIndex: 2,
      "& .MuiSvgIcon-root": {
        fontSize: "14px",
        color: "#fbbf24",
        filter: "drop-shadow(0 2px 4px rgba(251, 191, 36, 0.3))",
        animation: "testimonialStarTwinkle 2s ease-in-out infinite",
        "&:nth-of-type(1)": { animationDelay: "0s" },
        "&:nth-of-type(2)": { animationDelay: "0.2s" },
        "&:nth-of-type(3)": { animationDelay: "0.4s" },
        "&:nth-of-type(4)": { animationDelay: "0.6s" },
        "&:nth-of-type(5)": { animationDelay: "0.8s" },
      },
      "@keyframes testimonialStarTwinkle": {
        "0%, 100%": { transform: "scale(1)" },
        "50%": { transform: "scale(1.2)" },
      },
    },
    scrollHint: {
      textAlign: "center",
      mt: 6,
      color: "#64748b",
      fontSize: "14px",
      fontWeight: 400,
      position: "relative",
      zIndex: 2,
      "& span": {
        color: "#10b981",
        fontWeight: 600,
        fontSize: "16px",
      },
    },
  },

  /* ───────────────── Home Footer Search ─────────────────── */
  homeFooterSearch: {
    wrapper: {
      bgcolor: COLORS.lightBg,
      py: { xs: 3, md: 4 },
      px: 2,
    },
    container: {
      flexDirection: { xs: "column", md: "row" },
      alignItems: { xs: "stretch", md: "center" },
      justifyContent: "space-between",
      spacing: { xs: 3, md: 4 },
      maxWidth: "lg",
      mx: "auto",
    },
    heading: {
      fontSize: { xs: "22px", md: "24px" },
      fontWeight: "bold",
      lineHeight: 1.1,
      background: `linear-gradient(135deg, ${COLORS.primary} 50%, #FF6D00 20%)`,
      backgroundClip: "text",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      position: "relative",
      animation: "textGlow 2s ease-in-out infinite alternate",
      textAlign:"center",     
     letterSpacing: "-0.02em",
    },
    inputStack: {
      flexDirection: { xs: "column", sm: "row" },
      gap: 2,
      width: { xs: "100%", sm: "auto" },
    },
    input: {
      bgcolor: COLORS.white,
      minWidth: { sm: 260 },
      "& .MuiOutlinedInput-root": { borderRadius: 1 },
    },
    // button: {
    //   bgcolor: COLORS.secondary,
    //   "&:hover": { bgcolor: "#0e9f6e" },
    //   px: 4,
    //   fontWeight: 600,
    //   textTransform: "none",
    //   width: { xs: "100%", sm: "auto" },
    // },
    button: {
      bgcolor: "transparent",
      color: "#ffffff",
      fontSize: "14px",
      fontWeight: 400,
      px: 4,
      textTransform: "none",
      borderRadius: 5,
      width: { xs: "100%", sm: "auto" },
      position: "relative",
      overflow: "hidden",
      border: "2px solid transparent",
      background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
      backgroundClip: "padding-box",
      boxShadow: "0 10px 30px rgba(16, 185, 129, 0.4)",
      transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
      animation: "buttonPulse 2s ease-in-out infinite",
      "&::before": {
        content: '""',
        position: "absolute",
        top: 0,
        left: "-100%",
        width: "100%",
        height: "100%",
        background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
        transition: "left 0.6s",
      },
      "&:hover": {
        transform: "translateY(-3px) scale(1.05)",
        boxShadow: "0 20px 40px rgba(16, 185, 129, 0.6)",
        background: "linear-gradient(135deg, #059669 0%, #047857 100%)",
        "&::before": {
          left: "100%",
        },
        "&::after": {
          transform: "translateY(-50%) translateX(5px)",
        },
      },
      "&:active": {
        transform: "translateY(-1px) scale(1.02)",
      },
      "@keyframes buttonPulse": {
        "0%, 100%": { boxShadow: "0 10px 30px rgba(16, 185, 129, 0.4)" },
        "50%": { boxShadow: "0 15px 35px rgba(16, 185, 129, 0.6)" },
      },
    },
  },

  /*Aboutuspage*/
  aboutUsSection: {
    mainContainer: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      minHeight: { xs: "auto", md: "400px" },
      px: 2,
      py: 4,
    },
    aboutHeadinng: {
      color: COLORS.primary,
      fontWeight: "bold",
      mb: 3,
      textAlign: "center",
    },
    aboutDescription: {
      color: "#767F88",
      maxWidth: 900,
      textAlign: "center",
      fontSize: "1.1rem",
      lineHeight: 1.7,
    },
    cardsWrapper: {
      bgcolor: '#F1F2F4',
      py: { xs: 6, md: 8 },
    },
    gridSpacing: { xs: 9, md: 18 },
    gridJustify: "space-around",

    featureCardRoot: {
      maxWidth: 500,
      mx: "auto",
    },
    featureImage: {
      bgcolor: "#cfcfcf",
      height: { xs: 320, sm: 350 },
      mb: 3,
      borderRadius: 1,
    },
    featureTitle: {
      fontWeight: "bold",
      color: "#0d2142",
      mb: 1,
    },
    featureText: {
      color: "text.secondary",
      lineHeight: 1.6,
      mb: 2,
    },
    container: {
      px: { xs: 2, sm: 4, md: 8 },
      py: { xs: 4, sm: 6, md: 8 },
      backgroundColor: '#f7f9fc',
    },
    accordion: {
      mb: 2,
      borderRadius: 2,
      boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
      '&:before': { display: 'none' },
      transition: 'all 0.3s ease-in-out',
    },
    summary: {
      '& .MuiAccordionSummary-content': {
        marginY: 1,
      },
    },

    /* ---------- CTA ---------- */
    ctaWrapper: {
      textAlign: "center",
      mt: 6,
    },
    ctaButton: {
      bgcolor: COLORS.secondary,
      "&:hover": { bgcolor: "#0e9f6e" },
      px: 4,
      fontWeight: 400,
      "&:hover": { bgcolor: "#07a764" },
    },
    
  },
  circleFeatureSection: {
    sectionWrapper: {
      py: { xs: 6, md: 10 },
      textAlign: "center",
    },
    heading: {
      fontWeight: "bold",
      color: COLORS.primary,
      mb: 4
    },
    featureItem: {
      maxWidth: 300,
      mx: "auto"
    },
    circle: {
      width: 64,
      height: 64,
      bgcolor: "#dcdcdc",
      borderRadius: "50%",
      mx: "auto",
      mb: 2
    },
    featureTitle: {
      fontWeight: "bold",
      color: "#0d2142",
      mb: 1
    },
    featureDescription: {
      color: "text.secondary",
      fontSize: 14,
      lineHeight: 1.6
    },
    ctaWrapper: {
      textAlign: "center",
      mt: 6
    },
    ctaButton: {
      bgcolor: "#08c177",
      px: 4,
      fontWeight: 400,
      "&:hover": { bgcolor: "#07a764" }
    }
  },

  /*blogpage*/

  blogPage: {
    pageWrapper: { pb: 10 },

    heading: {
      textAlign: "center",
      fontWeight: "bold",
      color: "#0d2142",
      mt: 2,
      mb: 4
    },

    /* category pills / tabs */
    catBarWrapper: {
      display: "flex",
      justifyContent: "center",
      flexWrap: "wrap",
      gap: 3,
      borderBottom: "1px solid #e0e0e0",
      pb: 2,
      mb: 6
    },
    catChip: {
      fontWeight: 400,
      color: "#0d2142",
      cursor: "pointer",
      "&.active": {
        borderBottom: "2px solid #0d2142"
      }
    },

    /* cards */
    cardRoot: { maxWidth: 360, mx: "auto" },
    cardMedia: { height: 140, bgcolor: "#cfcfcf" },
    cardTitle: { fontWeight: "bold", color: "#0d2142", mt: 1, mb: 1 },
    cardExcerpt: { color: "text.secondary", fontSize: 14 },
    learnMore: { mt: 2, fontWeight: 400, color: "#0d66ff", cursor: "pointer" },

    cardFooter: {
      display: "flex",
      alignItems: "center",
      pt: 2,
      fontSize: 14,
      color: "text.secondary"
    },
    avatar: { width: 20, height: 20, bgcolor: "#cfcfcf", mr: 1 },

    /* dark CTA strip */
    ctaStrip: {
      bgcolor: "#002d5b",
      color: "#fff",
      py: { xs: 6, md: 8 },
      textAlign: "center",
      mt: 8,
      mb: 8
    },
    ctaText: { maxWidth: 700, mx: "auto", mb: 3, lineHeight: 1.7 },
    ctaBtn: {
      bgcolor: "#08c177",
      px: 4,
      fontWeight: 400,
      "&:hover": { bgcolor: "#07a764" }
    }
  }
  
};

/* Animation variant reused by Testimonial cards */
export const cardMotion = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 70, damping: 14 },
  },
};

export default style;
