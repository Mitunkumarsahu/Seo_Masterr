/* style.js  (or styles/index.js) */

export const COLORS = {
  primary: "#1e3a8a", // deep blue
  secondary: "#10b981", // green accent
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
      fontFamily:
        'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif',
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
      lineHeight: 1.2,
      mb: 3,
    },
    description: {
      fontSize: "16px",
      lineHeight: 1.5,
      mb: 4,
      maxWidth: 500,
      opacity: 0.9,
    },
    button: {
      bgcolor: COLORS.secondary,
      color: COLORS.white,
      fontSize: "14px",
      fontWeight: 600,
      px: 3,
      py: 1.5,
      textTransform: "uppercase",
      borderRadius: 1,
      width: "fit-content",
      "&:hover": { bgcolor: "#059669" },
    },
    rightSection: {
      backgroundColor: COLORS.heroSideBg,
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
      backgroundColor: COLORS.neutralBg,
      py: 6,
      px: 2,
      mt: 2,
    },
    heading: {
      color: COLORS.primary,
      fontWeight: "bold",
      fontSize: { xs: "20px", sm: "24px", md: "28px" },
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
        backgroundColor: COLORS.greyThumb,
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
      boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
    },
    avatar: {
      width: 64,
      height: 64,
      bgcolor: COLORS.greyLight,
    },
    cardTitle: { fontSize: "16px", fontWeight: "bold" },
    cardDescription: { color: "#6b7280", fontSize: "14px" },
    link: {
      display: "inline-flex",
      alignItems: "center",
      fontSize: "14px",
      fontWeight: 600,
      color: COLORS.accentBlue,
      textTransform: "lowercase",
    },
  },

  /* ───────────────────── Feature Section ─────────────────── */
  featureSection: {
    wrapper: {
      bgcolor: COLORS.navyBg,
      color: COLORS.white,
      py: 6,
      px: 2,
      mt: 5,
    },
    heading: {
      fontWeight: "bold",
      textAlign: "center",
      mb: 5,
      fontSize: { xs: "20px", md: "32px" },
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
      fontSize: "16px",
      lineHeight: 1.4,
    },
  },

  /* ─────────────────── Home About Section ────────────────── */
  homeAboutSection: {
    wrapper: {
      mt: 3,
      display: "flex",
      flexDirection: { xs: "column", md: "row" },
      minHeight: { xs: "auto", md: 500 },
      fontFamily:
        'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif',
    },
    leftSection: {
      color: COLORS.primary,
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
      lineHeight: 1.2,
      mb: 3,
    },
    description: {
      fontSize: "16px",
      lineHeight: 1.5,
      mb: 4,
      opacity: 0.9,
    },
    button: {
      bgcolor: COLORS.secondary,
      color: COLORS.white,
      fontSize: "14px",
      fontWeight: 600,
      px: 3,
      py: 1.5,
      textTransform: "uppercase",
      borderRadius: 1,
      width: "fit-content",
      "&:hover": { bgcolor: "#059669" },
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
    },
  },

  /* ────────────────── Testimonial Section ────────────────── */
  testimonialSection: {
    wrapper: {
      bgcolor: COLORS.neutralBg,
      mt: 4,
      py: { xs: 6, md: 8 },
      px: { xs: 2, md: 8 },
    },
    headline: {
      fontWeight: 700,
      textAlign: "center",
      mb: { xs: 5, md: 6 },
      color: COLORS.darkSlate, // '#0f172a'
    },
    paper: {
      p: 3,
      borderRadius: 3,
      bgcolor: COLORS.white,
      boxShadow: "0 6px 20px rgba(0,0,0,.05)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
      flexGrow: 1,
    },
    quoteIcon: {
      fontSize: 26,
      color: COLORS.secondary,
      mb: 1,
    },
    quoteText: {
      fontStyle: "italic",
      color: COLORS.slate700,
      mb: 3,
    },
    avatar: {
      width: 56,
      height: 56,
      mb: 1,
    },
    name: {
      fontWeight: 700,
      color: COLORS.darkSlate,
    },
    title: {
      color: COLORS.slate600,
      mb: 1,
    },
    stars: { mt: 0.5 },
    scrollHint: {
      display: { xs: "block", md: "none" },
      textAlign: "center",
      mt: 4,
      color: COLORS.slate600,
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
      fontWeight: 700,
      color: COLORS.primary,
      fontSize: { xs: "clamp(16px, 4.5vw, 18px)", sm: "20px" },
      lineHeight: 1.35,
      maxWidth: { md: "55%" },
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
    button: {
      bgcolor: COLORS.secondary,
      "&:hover": { bgcolor: "#0e9f6e" },
      px: 4,
      fontWeight: 600,
      textTransform: "none",
      width: { xs: "100%", sm: "auto" },
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
      fontWeight: 700,
      color: "#0d2142",
      mb: 1,
    },
    featureText: {
      color: "text.secondary",
      lineHeight: 1.6,
      mb: 2,
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
      fontWeight: 700,
      "&:hover": { bgcolor: "#07a764" },
    },
    
  },
  circleFeatureSection: {
    sectionWrapper: {
      py: { xs: 6, md: 10 },
      textAlign: "center",
    },
    heading: {
      fontWeight: 700,
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
      fontWeight: 700,
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
      fontWeight: 700,
      "&:hover": { bgcolor: "#07a764" }
    }
  },

  /*blogpage*/

  blogPage: {
    pageWrapper: { pb: 10 },

    heading: {
      textAlign: "center",
      fontWeight: 700,
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
      fontWeight: 600,
      color: "#0d2142",
      cursor: "pointer",
      "&.active": {
        borderBottom: "2px solid #0d2142"
      }
    },

    /* cards */
    cardRoot: { maxWidth: 360, mx: "auto" },
    cardMedia: { height: 140, bgcolor: "#cfcfcf" },
    cardTitle: { fontWeight: 700, color: "#0d2142", mt: 1, mb: 1 },
    cardExcerpt: { color: "text.secondary", fontSize: 14 },
    learnMore: { mt: 2, fontWeight: 700, color: "#0d66ff", cursor: "pointer" },

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
      fontWeight: 700,
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
