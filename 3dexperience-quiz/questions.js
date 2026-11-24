/* ==========================================================================
   3DEXPERIENCE Basic Knowledge Quiz — Question Bank (105 Questions)
   10 core categories • 4 options each • 1 correct answer • Champion Hints
   ========================================================================== */

window.QUIZ_QUESTIONS = [
  // =========================================================================
  // 1. PLATFORM FUNDAMENTALS & 3DCOMPASS (1–12)
  // =========================================================================
  {
    id: 1,
    category: "Platform & 3DCompass",
    question: "Which company develops and provides the 3DEXPERIENCE platform?",
    options: [
      "Dassault Systèmes",
      "Siemens Digital Industries",
      "Autodesk",
      "PTC"
    ],
    correctIndex: 0,
    explanation: "The 3DEXPERIENCE platform is developed by Dassault Systèmes, uniting its brands (CATIA, SOLIDWORKS, ENOVIA, SIMULIA, DELMIA, NETVIBES, and more) in one environment.",
    championHint: "Think of the French software leader behind CATIA and SOLIDWORKS—they call themselves 'The 3DEXPERIENCE Company'."
  },
  {
    id: 2,
    category: "Platform & 3DCompass",
    question: "What is the primary purpose of the 3DCompass icon in the top-left corner of the platform?",
    options: [
      "To navigate and launch your assigned Roles, Apps, and Services",
      "To rotate 3D models along the X, Y, and Z axes",
      "To display the geographic location of your cloud server",
      "To switch between keyboard shortcut presets"
    ],
    correctIndex: 0,
    explanation: "The 3DCompass is the central gateway to the 3DEXPERIENCE platform, letting you browse your Roles and launch both web and native apps.",
    championHint: "Whenever you don't know where to find an app on the platform, click the Compass—it's your master app launcher!"
  },
  {
    id: 3,
    category: "Platform & 3DCompass",
    question: "Which quadrant of the 3DCompass groups Social and Collaborative Apps (such as 3DSwym and 3DDrive)?",
    options: [
      "North",
      "West",
      "South",
      "East"
    ],
    correctIndex: 0,
    explanation: "The North quadrant of the 3DCompass is dedicated to Social & Collaborative Apps, connecting people and communities.",
    championHint: "Easy mnemonic: North is for Networking and Social Collaboration!"
  },
  {
    id: 4,
    category: "Platform & 3DCompass",
    question: "Which quadrant of the 3DCompass contains 3D Modeling Apps?",
    options: [
      "West",
      "North",
      "South",
      "East"
    ],
    correctIndex: 0,
    explanation: "The West quadrant of the 3DCompass houses 3D Modeling Apps such as CATIA, SOLIDWORKS Cloud/xDesign, and 3DPlay.",
    championHint: "Remember the compass layout: North = Social, South = Simulation, East = Information Intelligence, leaving West for 3D Modeling."
  },
  {
    id: 5,
    category: "Platform & 3DCompass",
    question: "Which quadrant of the 3DCompass is dedicated to Simulation Apps (such as SIMULIA and DELMIA)?",
    options: [
      "South",
      "North",
      "West",
      "East"
    ],
    correctIndex: 0,
    explanation: "The South quadrant of the 3DCompass provides access to virtual prototyping, FEA, and manufacturing simulation apps.",
    championHint: "Use the alliteration trick: 'S' for South, 'S' for Simulation!"
  },
  {
    id: 6,
    category: "Platform & 3DCompass",
    question: "Which quadrant of the 3DCompass houses Information Intelligence Apps (such as NETVIBES and analytics)?",
    options: [
      "East",
      "West",
      "North",
      "South"
    ],
    correctIndex: 0,
    explanation: "The East quadrant of the 3DCompass focuses on Information Intelligence, helping users gather, visualize, and analyze enterprise and web data.",
    championHint: "North is Social, West is 3D Modeling, South is Simulation—so Information Intelligence sits on the right side: East."
  },
  {
    id: 7,
    category: "Platform & 3DCompass",
    question: "What does the center 'Play' button of the 3DCompass primarily connect users to?",
    options: [
      "3DEXPERIENCE Marketplace and online platform experiences/services",
      "Audio playback settings for video tutorials",
      "Local desktop printer configuration",
      "A mandatory daily training quiz"
    ],
    correctIndex: 0,
    explanation: "The center Play button opens access to 3DEXPERIENCE Marketplace services (like PartSupply and Make) and collaborative experiences.",
    championHint: "At the heart of the Compass is where you 'experience' services like sourcing standard parts or ordering manufacturing."
  },
  {
    id: 8,
    category: "Platform & 3DCompass",
    question: "How are apps and capabilities bundled and assigned to individual users on the 3DEXPERIENCE platform?",
    options: [
      "Through Roles assigned by an administrator",
      "By manually installing standalone .exe installers from the internet",
      "Based solely on the user's web browser brand",
      "Every user automatically receives every paid app by default"
    ],
    correctIndex: 0,
    explanation: "3DEXPERIENCE organizes apps into job-focused Roles (e.g., 3DSwymer, Collaborative Industry Innovator, Mechanical Designer) assigned per user.",
    championHint: "Think of licensing on 3DEXPERIENCE: users are granted 'Roles', and each Role unlocks a curated bundle of apps."
  },
  {
    id: 9,
    category: "Platform & 3DCompass",
    question: "What is a 'Tenant' on the 3DEXPERIENCE Cloud platform?",
    options: [
      "A company's dedicated, isolated cloud environment containing its users, spaces, and data",
      "A temporary guest password valid for 24 hours",
      "A specific file extension for 3D assemblies",
      "A single dashboard tab shared with one colleague"
    ],
    correctIndex: 0,
    explanation: "Each subscribing organization receives its own secure Tenant (with a unique URL) to manage its users, roles, collaborative spaces, and intellectual property.",
    championHint: "In cloud platforms, a 'Tenant' is your organization's private apartment inside the broader cloud infrastructure."
  },
  {
    id: 10,
    category: "Platform & 3DCompass",
    question: "What is 3DPassport used for across Dassault Systèmes services?",
    options: [
      "Single sign-on authentication and user identity management",
      "Tracking international shipping of physical prototypes",
      "Converting PDF files into 3D CAD geometry",
      "Measuring network download speed"
    ],
    correctIndex: 0,
    explanation: "3DPassport provides secure single sign-on (SSO) credentials so one account grants seamless access to your 3DEXPERIENCE tenant and communities.",
    championHint: "Just like a real passport proves your identity at borders, 3DPassport verifies who you are when signing in!"
  },
  {
    id: 11,
    category: "Platform & 3DCompass",
    question: "Which set of core controls appears in the top header bar of the 3DEXPERIENCE web interface?",
    options: [
      "3DCompass, 3DSearch bar, 6WTags, Notifications, and User Profile",
      "CAD Sketch palette, Extrude tool, and Fillet tool",
      "Database SQL console, Firewall rules, and BIOS settings",
      "Email inbox, Calendar invite button, and Spreadsheet formulas"
    ],
    correctIndex: 0,
    explanation: "The persistent top bar gives instant access to the 3DCompass, 3DSearch, 6WTags filter icon, notifications bell, help, and profile menu.",
    championHint: "No matter which dashboard or app you open, the top bar keeps navigation, search, tags, and alerts within one click."
  },
  {
    id: 12,
    category: "Platform & 3DCompass",
    question: "What is the foundational goal of the 3DEXPERIENCE platform?",
    options: [
      "Providing a single unified environment connecting people, data, processes, and apps across the product lifecycle",
      "Replacing all web browsers with a proprietary operating system",
      "Serving exclusively as an offline 2D drafting tool",
      "Acting only as a public social media network for consumers"
    ],
    correctIndex: 0,
    explanation: "3DEXPERIENCE acts as a single source of truth that bridges ideation, design, simulation, manufacturing, and business collaboration.",
    championHint: "Look for the option that emphasizes unifying people, data, and the entire product lifecycle in one platform."
  },

  // =========================================================================
  // 2. 3DDASHBOARD & WIDGETS (13–22)
  // =========================================================================
  {
    id: 13,
    category: "3DDashboard & Widgets",
    question: "What is the primary purpose of 3DDashboard?",
    options: [
      "To build customizable workspaces combining tabs and interactive app widgets",
      "To store raw CAD binaries in an encrypted ZIP archive",
      "To compile C++ source code for embedded microcontrollers",
      "To edit video clips frame by frame"
    ],
    correctIndex: 0,
    explanation: "3DDashboard lets users assemble personalized or team workspaces made of tabs populated with live widgets from across the platform.",
    championHint: "Think of 3DDashboard as your customizable command center where you pin the exact widgets you use daily."
  },
  {
    id: 14,
    category: "3DDashboard & Widgets",
    question: "How do you add a web app to a tab inside 3DDashboard?",
    options: [
      "Drag and drop the app icon from the 3DCompass onto the dashboard tab",
      "Email the app name to Dassault Systèmes support",
      "Type an HTML iframe snippet into the browser address bar",
      "Restart your computer while holding the Shift key"
    ],
    correctIndex: 0,
    explanation: "Web apps that support dashboard embedding can simply be dragged straight from the 3DCompass panel and dropped onto any dashboard tab.",
    championHint: "It's one of the signature UX gestures of 3DEXPERIENCE: open the Compass, grab an app, and drag-and-drop it right onto your tab!"
  },
  {
    id: 15,
    category: "3DDashboard & Widgets",
    question: "What is a 'Widget' in the context of 3DDashboard?",
    options: [
      "An interactive app tile placed inside a dashboard tab",
      "A physical USB dongle required to run the browser",
      "A deleted CAD component waiting in the recycle bin",
      "An automated weekly billing invoice"
    ],
    correctIndex: 0,
    explanation: "Widgets are modular web applications—like 3DPlay, Bookmark Editor, or 3DSwym—arranged side-by-side inside a dashboard tab.",
    championHint: "When you drop an app onto a dashboard tab, the resizable window it creates is called a Widget."
  },
  {
    id: 16,
    category: "3DDashboard & Widgets",
    question: "How can you organize different workstreams (e.g., Design Review, Tasks, Communities) inside a single 3DDashboard?",
    options: [
      "By creating multiple Tabs within the dashboard",
      "By creating a separate 3DPassport account for each workstream",
      "By opening only one widget per tenant",
      "By exporting the dashboard to a PDF every morning"
    ],
    correctIndex: 0,
    explanation: "A single 3DDashboard supports multiple tabs along the top, allowing clean separation of workflows inside one shared workspace.",
    championHint: "Just like a modern web browser or spreadsheet, dashboards use Tabs to keep related topics neatly grouped."
  },
  {
    id: 17,
    category: "3DDashboard & Widgets",
    question: "How can you share a custom 3DDashboard with your project team?",
    options: [
      "Use the dashboard menu's Share option to add members or User Groups",
      "Take a screenshot and upload it to 3DDrive",
      "Copy your browser cookies and send them over chat",
      "Dashboards are strictly private and can never be shared"
    ],
    correctIndex: 0,
    explanation: "Dashboard owners can share a dashboard directly with individual colleagues or User Groups so everyone works from the same standardized setup.",
    championHint: "Every dashboard has an actions menu right next to its title—look for the Share capability that supports both users and groups."
  },
  {
    id: 18,
    category: "3DDashboard & Widgets",
    question: "In a shared 3DDashboard, what distinguishes a 'Reader' from an 'Owner'?",
    options: [
      "An Owner can modify the shared layout and tabs, while a Reader uses the widgets without altering the shared structure",
      "A Reader cannot click any button inside any widget",
      "An Owner can only view widgets in grayscale mode",
      "There is no difference; both roles have identical permissions"
    ],
    correctIndex: 0,
    explanation: "Readers can interact with the data inside widgets (according to their data permissions), whereas Owners can add/remove tabs, rearrange widgets, and manage members.",
    championHint: "Think of dashboard governance: Owners control the layout blueprint, while Readers consume and work inside it safely."
  },
  {
    id: 19,
    category: "3DDashboard & Widgets",
    question: "What does clicking the 'Maximize' button on a widget's title bar do?",
    options: [
      "Temporarily expands that single widget to fill the dashboard area",
      "Permanently deletes all other widgets on the tab",
      "Increases the CAD model's physical dimensions by 200%",
      "Downloads the widget as a mobile app"
    ],
    correctIndex: 0,
    explanation: "Maximizing gives a widget full screen space for detailed work, and clicking Restore returns it smoothly to its multi-widget grid.",
    championHint: "When a small dashboard tile feels cramped, maximizing gives you full-screen focus without losing your layout."
  },
  {
    id: 20,
    category: "3DDashboard & Widgets",
    question: "Which built-in widget lets you embed an external webpage or intranet portal directly inside a 3DDashboard tab?",
    options: [
      "Web Page Reader",
      "3DPlay",
      "Collaborative Lifecycle",
      "Bookmark Editor"
    ],
    correctIndex: 0,
    explanation: "The Web Page Reader widget displays external URLs (when allowed by the site's headers) right beside your 3DEXPERIENCE apps.",
    championHint: "Its name literally describes reading a web page inside your dashboard!"
  },
  {
    id: 21,
    category: "3DDashboard & Widgets",
    question: "What happens when you drag a 3D part from Bookmark Editor and drop it onto a 3DPlay widget on the same dashboard tab?",
    options: [
      "3DPlay loads and displays the 3D part immediately in context",
      "The 3D part is permanently deleted from 3DSpace",
      "The file is converted into a plain text CSV",
      "Nothing happens because widgets cannot interact with each other"
    ],
    correctIndex: 0,
    explanation: "Widgets on 3DDashboard are designed for seamless drag-and-drop interoperability—dropping an object into 3DPlay renders it immediately.",
    championHint: "Cross-widget drag-and-drop is one of 3DDashboard's biggest time-savers—3DPlay opens whatever compatible object you drop on it."
  },
  {
    id: 22,
    category: "3DDashboard & Widgets",
    question: "What does the 'Fit' option in a dashboard tab menu do?",
    options: [
      "Automatically resizes and aligns widgets to neatly fill the visible browser screen",
      "Compresses CAD file sizes before uploading",
      "Checks whether a mechanical assembly has interference collisions",
      "Filters out users who haven't logged in this week"
    ],
    correctIndex: 0,
    explanation: "The Fit layout option adjusts widget dimensions automatically so they fill your viewport cleanly without awkward scrolling or gaps.",
    championHint: "It's purely a visual layout helper so your widgets fit cleanly inside your monitor's window."
  },

  // =========================================================================
  // 3. 3DSWYM & SOCIAL COLLABORATION (23–33)
  // =========================================================================
  {
    id: 23,
    category: "3DSwym & Collaboration",
    question: "What is 3DSwym primarily used for on the 3DEXPERIENCE platform?",
    options: [
      "Social collaboration through communities, posts, questions, ideas, surveys, and wikis",
      "Running finite element thermal stress simulations",
      "Generating CNC G-code toolpaths for 5-axis mills",
      "Managing financial payroll and tax filings"
    ],
    correctIndex: 0,
    explanation: "3DSwym ('See What You Mean') is the social collaboration hub where teams share updates, ask questions, brainstorm ideas, and build wikis.",
    championHint: "Fun fact: SWYM stands for 'See What You Mean'—it's all about team communication, communities, and idea sharing!"
  },
  {
    id: 24,
    category: "3DSwym & Collaboration",
    question: "Which 3DSwym content type is specifically built to capture and mature innovation proposals through stages?",
    options: [
      "Idea",
      "Media",
      "Bookmark",
      "Revision"
    ],
    correctIndex: 0,
    explanation: "3DSwym Ideas pass through a customizable maturity funnel (such as New, In Progress, Validated, and Implemented) so teams can turn concepts into projects.",
    championHint: "When brainstorming new product concepts in 3DSwym, there's a dedicated post type named right after the concept itself!"
  },
  {
    id: 25,
    category: "3DSwym & Collaboration",
    question: "What is the purpose of the Idea Funnel (Idea Pipeline) inside a 3DSwym community?",
    options: [
      "To track and advance submitted ideas from initial concept to validation or implementation",
      "To filter out spam emails from external domains",
      "To funnel 3D CAD meshes into a 3D printer queue",
      "To archive deleted community members"
    ],
    correctIndex: 0,
    explanation: "The Idea Funnel gives community managers a structured stage-gate pipeline to evaluate, discuss, and promote the best team ideas.",
    championHint: "Think of an innovation funnel: lots of ideas enter at the top, and the strongest ones advance stage by stage."
  },
  {
    id: 26,
    category: "3DSwym & Collaboration",
    question: "What special capability does a 'Question' post offer in 3DSwym?",
    options: [
      "The author or community owner can mark a reply as the Validated Answer",
      "It automatically locks every file in 3DSpace until answered",
      "It sends a physical SMS to every employee worldwide",
      "It expires and self-destructs after 60 minutes"
    ],
    correctIndex: 0,
    explanation: "Marking a reply as the Validated Answer highlights the verified solution at the top so future teammates find trusted answers fast.",
    championHint: "Just like top Q&A forums, 3DSwym Questions let you crown the best reply as the 'Validated Answer'."
  },
  {
    id: 27,
    category: "3DSwym & Collaboration",
    question: "Which 3DSwym feature is best suited for building structured, multi-page team guidelines and onboarding manuals?",
    options: [
      "Wiki",
      "Survey",
      "WeDo",
      "Instant Chat"
    ],
    correctIndex: 0,
    explanation: "3DSwym Wikis let community members collaboratively author, organize in a page tree, and maintain living documentation.",
    championHint: "Whenever you need a living, collaboratively edited knowledge base with organized pages, think of the classic 'Wiki'."
  },
  {
    id: 28,
    category: "3DSwym & Collaboration",
    question: "Which 3DSwym post type lets you run a quick poll or questionnaire to collect structured votes from members?",
    options: [
      "Survey",
      "Wiki",
      "Media",
      "Route"
    ],
    correctIndex: 0,
    explanation: "Surveys let community members create single-choice, multi-choice, or open questions and immediately view aggregated results.",
    championHint: "Need the team to vote on a design option or meeting time? Launch a quick Survey right inside the community."
  },
  {
    id: 29,
    category: "3DSwym & Collaboration",
    question: "What are the three standard visibility levels for a 3DSwym community?",
    options: [
      "Public, Private, and Secret",
      "Draft, Frozen, and Released",
      "Local, Regional, and Global",
      "Bronze, Silver, and Gold"
    ],
    correctIndex: 0,
    explanation: "3DSwym communities can be Public (anyone on the tenant can join), Private (discoverable, request to join), or Secret (hidden, invite-only).",
    championHint: "Don't confuse these with 3DSpace (Private/Protected/Public)—in 3DSwym, the most hidden community type is 'Secret'."
  },
  {
    id: 30,
    category: "3DSwym & Collaboration",
    question: "Who can discover and view a 'Secret' community in 3DSwym?",
    options: [
      "Only users explicitly invited to that community",
      "Everyone on the public internet",
      "Any tenant user who searches for its name in 3DSearch",
      "Only users with a CAD license"
    ],
    correctIndex: 0,
    explanation: "Secret communities are invisible in search results and community lists to non-members; access is strictly by invitation.",
    championHint: "The word 'Secret' is literal here: if you aren't invited, you won't even know the community exists!"
  },
  {
    id: 31,
    category: "3DSwym & Collaboration",
    question: "Which community role in 3DSwym has full administrative control over settings, member roles, and content moderation?",
    options: [
      "Owner",
      "Author",
      "Contributor",
      "Viewer"
    ],
    correctIndex: 0,
    explanation: "Community Owners configure features (like Ideas and Wikis), manage membership, and moderate posts.",
    championHint: "Across 3DEXPERIENCE—both in 3DSwym and 3DSpace—the top administrative responsibility is called 'Owner'."
  },
  {
    id: 32,
    category: "3DSwym & Collaboration",
    question: "What can you do with Conversations (3DMessaging) inside 3DSwym?",
    options: [
      "Hold real-time text chats, group discussions, and audio/video calls with colleagues",
      "Edit parametric CAD sketches in real time",
      "Configure company firewall ports",
      "Approve formal engineering Change Actions automatically"
    ],
    correctIndex: 0,
    explanation: "Conversations enable instant 1-on-1 or group messaging, file/snapshot sharing, and calls directly inside the platform without switching tools.",
    championHint: "It's the built-in instant messenger and calling tool right inside 3DSwym!"
  },
  {
    id: 33,
    category: "3DSwym & Collaboration",
    question: "How do you tag and directly notify a specific teammate inside a 3DSwym post or comment?",
    options: [
      "Type '@' followed by their name",
      "Type '#' followed by their employee ID",
      "Write their name in ALL CAPS",
      "Attach their profile picture as a JPG"
    ],
    correctIndex: 0,
    explanation: "Using an @mention links the user's profile and triggers a platform notification so they see your comment immediately.",
    championHint: "It works just like modern collaboration apps—use the '@' symbol to summon a teammate's attention."
  },

  // =========================================================================
  // 4. 3DDRIVE & CLOUD FILE SHARING (34–43)
  // =========================================================================
  {
    id: 34,
    category: "3DDrive & File Sharing",
    question: "What is the main purpose of 3DDrive on the 3DEXPERIENCE platform?",
    options: [
      "Personal and ad-hoc cloud file storage, folder organization, and lightweight sharing",
      "Managing formal multi-level Bills of Materials (BOMs)",
      "Simulating autonomous vehicle driving scenarios",
      "Controlling shop-floor CNC machine motors"
    ],
    correctIndex: 0,
    explanation: "3DDrive provides familiar cloud-drive storage for documents, media, and CAD files with easy sharing and built-in 3D preview.",
    championHint: "Think of 3DDrive as the 3DEXPERIENCE equivalent of a cloud drive—with native 3D CAD viewing superpowers!"
  },
  {
    id: 35,
    category: "3DDrive & File Sharing",
    question: "What is the key difference between 3DDrive and 3DSpace?",
    options: [
      "3DDrive is for informal folder-based file sharing, while 3DSpace provides structured PLM management with maturity states and revisions",
      "3DDrive only stores images, while 3DSpace only stores text files",
      "3DDrive requires a paid simulation license, while 3DSpace is offline only",
      "They are two different names for the exact same app"
    ],
    correctIndex: 0,
    explanation: "Use 3DDrive for personal files and quick ad-hoc sharing; use 3DSpace for controlled engineering data requiring lifecycle maturity, locking, and formal revisioning.",
    championHint: "Remember the rule of thumb: 3DDrive = lightweight cloud drive; 3DSpace = structured engineering PLM vault."
  },
  {
    id: 36,
    category: "3DDrive & File Sharing",
    question: "How can you access and sync your 3DDrive folders directly inside Windows File Explorer?",
    options: [
      "By installing the 3DDrive desktop synchronization app",
      "By formatting a USB flash drive in 3DX format",
      "By renaming your Desktop folder to '3DDrive'",
      "3DDrive can never synchronize with a local computer"
    ],
    correctIndex: 0,
    explanation: "The 3DDrive desktop app creates a synced local folder so you can work with files seamlessly in Windows Explorer while keeping the cloud updated.",
    championHint: "Just like other cloud storage tools, Dassault Systèmes provides a lightweight desktop sync app for Windows Explorer."
  },
  {
    id: 37,
    category: "3DDrive & File Sharing",
    question: "Which two permission levels can you assign when sharing a file or folder with a teammate in 3DDrive?",
    options: [
      "Can View or Can Edit",
      "Frozen or Released",
      "Author or Obsolete",
      "Admin or Superuser"
    ],
    correctIndex: 0,
    explanation: "3DDrive keeps sharing simple with two clear choices: 'Can View' (read-only access) and 'Can Edit' (allows uploading, modifying, or organizing).",
    championHint: "3DDrive keeps permissions super simple—either someone can just look at the files, or they can also modify them."
  },
  {
    id: 38,
    category: "3DDrive & File Sharing",
    question: "Can 3DDrive share files with external partners or customers who do not belong to your company tenant?",
    options: [
      "Yes, by generating an external share link (when enabled by tenant policy)",
      "No, external sharing is technically impossible in 3DDrive",
      "Only if the external partner ships a hard drive to Dassault Systèmes",
      "Only for files smaller than 10 kilobytes"
    ],
    correctIndex: 0,
    explanation: "3DDrive supports share-by-link functionality so external stakeholders can preview or download shared content safely without needing full tenant membership.",
    championHint: "External link sharing is actually one of the top reasons teams use 3DDrive to review designs with suppliers or customers!"
  },
  {
    id: 39,
    category: "3DDrive & File Sharing",
    question: "What happens when you double-click or preview a supported 3D CAD file inside 3DDrive?",
    options: [
      "It opens directly in the browser using the built-in 3DPlay viewer",
      "It displays raw hexadecimal machine code",
      "It forces your browser to close and launch Notepad",
      "It automatically converts the file into a 2D JPEG and deletes the 3D model"
    ],
    correctIndex: 0,
    explanation: "3DDrive integrates directly with 3DPlay, letting you spin, zoom, section, and inspect 3D CAD models right inside the browser.",
    championHint: "You don't need CAD software installed just to inspect a model in 3DDrive—3DPlay handles the preview right in your browser."
  },
  {
    id: 40,
    category: "3DDrive & File Sharing",
    question: "If you accidentally delete a file in 3DDrive, where can you recover it before it is permanently purged?",
    options: [
      "In the Trash section of 3DDrive",
      "In the 3DSwym Idea Funnel",
      "Inside 3DPassport settings",
      "Deleted files in 3DDrive can never be recovered"
    ],
    correctIndex: 0,
    explanation: "Deleted items move to the 3DDrive Trash first, giving you the option to restore them or empty the trash permanently.",
    championHint: "Look at the left navigation sidebar of 3DDrive—there is a familiar safety net called 'Trash'!"
  },
  {
    id: 41,
    category: "3DDrive & File Sharing",
    question: "In 3DDrive, where do you find files and folders that colleagues have shared with you?",
    options: [
      "In the 'Shared with me' section",
      "Inside 'My Trash'",
      "Inside 'Platform Management'",
      "They automatically overwrite your 'My Files' root folder"
    ],
    correctIndex: 0,
    explanation: "3DDrive separates your personal 'My Files' from 'Shared with me' so incoming collaborations stay tidy and easy to locate.",
    championHint: "Just like major cloud storage platforms, incoming shared items live in their own 'Shared with me' view."
  },
  {
    id: 42,
    category: "3DDrive & File Sharing",
    question: "Can teammates leave feedback comments directly on a file stored in 3DDrive?",
    options: [
      "Yes, through the Comments panel on the selected file",
      "No, comments only exist in 3DSwym communities",
      "Only if the file is renamed to include the comment text",
      "Only on Microsoft Word files, never on 3D files"
    ],
    correctIndex: 0,
    explanation: "3DDrive includes a built-in Comments tab in the file information panel so collaborators can discuss revisions right alongside the file.",
    championHint: "Open a file's side panel in 3DDrive and you'll find properties, sharing info, and a dedicated Comments thread!"
  },
  {
    id: 43,
    category: "3DDrive & File Sharing",
    question: "Which foundational 3DEXPERIENCE role provides 3DDrive access to every platform user?",
    options: [
      "3DSwymer (formerly Collaborative Business Innovator)",
      "Structural Mechanics Engineer",
      "NC Mill-Turn Machine Programmer",
      "Mold & Tooling Designer"
    ],
    correctIndex: 0,
    explanation: "3DSwymer (previously called Collaborative Business Innovator) is the base role for all platform users and includes 3DDashboard, 3DSwym, 3DDrive, and 3DPlay.",
    championHint: "Every user starts with the same foundational collaboration role—look for the one formerly called Collaborative Business Innovator."
  },

  // =========================================================================
  // 5. 3DSPACE & COLLABORATIVE SPACES (44–55)
  // =========================================================================
  {
    id: 44,
    category: "3DSpace & Collaborative Spaces",
    question: "What is the role of 3DSpace on the 3DEXPERIENCE platform?",
    options: [
      "A secure cloud PLM repository that stores and manages structured engineering and product data",
      "A 3D outer-space simulation game",
      "A video conferencing app for webinars",
      "A public blog hosting service"
    ],
    correctIndex: 0,
    explanation: "3DSpace is the core data management vault where CAD models, assemblies, drawings, and specifications are stored under revision and lifecycle control.",
    championHint: "When engineering data needs true PLM control (maturity, revisions, permissions), it belongs in 3DSpace."
  },
  {
    id: 45,
    category: "3DSpace & Collaborative Spaces",
    question: "What is a 'Collaborative Space' inside 3DSpace?",
    options: [
      "A secure storage container with defined visibility and member access roles for organizing project data",
      "A physical meeting room booked through a calendar widget",
      "A temporary browser cache folder on your laptop",
      "A chat thread inside 3DMessaging"
    ],
    correctIndex: 0,
    explanation: "Collaborative Spaces act like secure vaults inside 3DSpace, controlling who can see, create, edit, or release data within a project or department.",
    championHint: "Think of each Collaborative Space as a secure vault with its own visibility rule and member permission list."
  },
  {
    id: 46,
    category: "3DSpace & Collaborative Spaces",
    question: "What are the three visibility settings available for a Collaborative Space?",
    options: [
      "Private, Protected, and Public",
      "Secret, Hidden, and Open",
      "Draft, Active, and Archived",
      "Read, Write, and Execute"
    ],
    correctIndex: 0,
    explanation: "Collaborative Spaces use three visibility levels—Private, Protected, and Public—to control whether non-members can see content based on maturity.",
    championHint: "Remember the three P's of Collaborative Space visibility: Private, Protected, and Public!"
  },
  {
    id: 47,
    category: "3DSpace & Collaborative Spaces",
    question: "In a 'Private' Collaborative Space, who can view or access the data stored inside?",
    options: [
      "Only users who have been explicitly added as members of that Collaborative Space",
      "Every user in the company once a file is Released",
      "Anyone with the company's tenant URL",
      "Only users outside the organization"
    ],
    correctIndex: 0,
    explanation: "Data inside a Private Collaborative Space remains strictly accessible to invited members regardless of its maturity state.",
    championHint: "Private means strictly members-only—even Released files stay inside that team's circle."
  },
  {
    id: 48,
    category: "3DSpace & Collaborative Spaces",
    question: "How does a 'Protected' Collaborative Space handle content visibility?",
    options: [
      "Content is visible only to members while In Work/Frozen, and becomes visible to the broader organization once Released or Obsolete",
      "Content is permanently hidden even from the Owner",
      "Content is visible to everyone on the internet immediately upon creation",
      "Content requires a 16-digit PIN every time it is opened"
    ],
    correctIndex: 0,
    explanation: "Protected spaces keep work-in-progress designs private to the project team, then automatically make approved Released (or Obsolete) data discoverable across the organization.",
    championHint: "Protected gives you the best of both worlds: private during design, visible to the company once Released!"
  },
  {
    id: 49,
    category: "3DSpace & Collaborative Spaces",
    question: "What type of content is a 'Public' Collaborative Space best suited for?",
    options: [
      "Standard hardware, shared component libraries, and company-wide templates",
      "Top-secret R&D prototypes restricted to two engineers",
      "Confidential HR salary spreadsheets",
      "Unfinished personal scratch sketches"
    ],
    correctIndex: 0,
    explanation: "Public Collaborative Spaces make content visible across the organization (and eligible external readers), making them ideal for standard parts and reusable libraries.",
    championHint: "Use Public spaces for items everyone should reuse—like fasteners, standard libraries, and approved templates."
  },
  {
    id: 50,
    category: "3DSpace & Collaborative Spaces",
    question: "Can a Collaborative Space's visibility be downgraded from Public back to Private?",
    options: [
      "No; visibility can only be widened (e.g., Private → Protected → Public), never narrowed back",
      "Yes, any Reader can switch it back and forth anytime",
      "Yes, simply by renaming the space",
      "Only on Sundays during maintenance windows"
    ],
    correctIndex: 0,
    explanation: "Visibility promotion is one-way in 3DEXPERIENCE: once data is exposed via Protected or Public visibility, you cannot revert the space back to Private.",
    championHint: "Be careful when setting up a Collaborative Space! Visibility is a one-way ratchet—you can open it wider, not shrink it back."
  },
  {
    id: 51,
    category: "3DSpace & Collaborative Spaces",
    question: "Which Collaborative Space access role allows viewing/opening data only, without creating or editing anything?",
    options: [
      "Reader (or Public Reader)",
      "Author",
      "Leader",
      "Owner"
    ],
    correctIndex: 0,
    explanation: "Readers (and Public Readers for external/restricted contexts) have read-only access and cannot create, modify, or release content.",
    championHint: "The name says it all—if you can only read and view data, you're a Reader."
  },
  {
    id: 52,
    category: "3DSpace & Collaborative Spaces",
    question: "Which Collaborative Space role lets engineers create and edit designs, but prevents them from promoting items to Released or Obsolete?",
    options: [
      "Author",
      "Reader",
      "Leader",
      "Owner"
    ],
    correctIndex: 0,
    explanation: "Authors create, lock, modify, and freeze designs, while formal release and obsolescence permissions are reserved for Leaders and Owners.",
    championHint: "Authors 'author' (create and edit) designs, whereas approving them to Released requires a higher responsibility."
  },
  {
    id: 53,
    category: "3DSpace & Collaborative Spaces",
    question: "Which Collaborative Space access role can promote designs to Released or Obsolete and manage shared templates/libraries?",
    options: [
      "Leader",
      "Reader",
      "Contributor",
      "Public Reader"
    ],
    correctIndex: 0,
    explanation: "Leaders have full content-management authority within a Collaborative Space, including releasing and obsoleting objects.",
    championHint: "One step above Author is the person who leads engineering releases in the space: the Leader!"
  },
  {
    id: 54,
    category: "3DSpace & Collaborative Spaces",
    question: "Which Collaborative Space responsibility grants administrative rights to add/remove members and configure space settings?",
    options: [
      "Owner",
      "Contributor",
      "Author",
      "Reader"
    ],
    correctIndex: 0,
    explanation: "Owners hold administrative control over the Collaborative Space, including membership management and access rights.",
    championHint: "Who owns the keys to the vault and decides who gets invited? The Owner!"
  },
  {
    id: 55,
    category: "3DSpace & Collaborative Spaces",
    question: "What is a 'Contributor' permitted to do in a Collaborative Space?",
    options: [
      "View data and add complementary objects (like comments or evaluations) without modifying or releasing core designs",
      "Delete Released production assemblies",
      "Change the Collaborative Space from Private to Public",
      "Create new user accounts on the tenant"
    ],
    correctIndex: 0,
    explanation: "Contributors sit between Readers and Authors—they can evaluate content and augment it with feedback/supporting items without altering the core engineering files.",
    championHint: "Contributors 'contribute' feedback and evaluations, while leaving CAD creation and edits to Authors."
  },

  // =========================================================================
  // 6. 3DSEARCH & 6WTAGS (56–65)
  // =========================================================================
  {
    id: 56,
    category: "3DSearch & 6WTags",
    question: "Where is the 3DSearch input bar located in the 3DEXPERIENCE web interface?",
    options: [
      "At the top center of the platform header bar",
      "Hidden inside the bottom-left footer",
      "Only inside the 3DDrive Trash folder",
      "Inside the browser's developer console"
    ],
    correctIndex: 0,
    explanation: "3DSearch sits prominently at the top of the platform header so you can search across all indexed spaces, files, and communities from anywhere.",
    championHint: "Look straight up at the top bar—3DSearch is always front and center so you can find anything in seconds."
  },
  {
    id: 57,
    category: "3DSearch & 6WTags",
    question: "What are the six dimensions represented by 6WTags?",
    options: [
      "Who, What, When, Where, Why, and How",
      "Width, Weight, Wavelength, Wattage, Wear, and Warp",
      "Windows, Web, Widgets, Wikis, Workflows, and Workspaces",
      "Wireframe, Weldment, Wall, Wheel, Washer, and Wrench"
    ],
    correctIndex: 0,
    explanation: "6WTags classify all platform metadata into six intuitive human questions: Who, What, When, Where, Why, and How.",
    championHint: "Think of a journalist's classic questions—5 W's plus 'hoW'!"
  },
  {
    id: 58,
    category: "3DSearch & 6WTags",
    question: "What is the primary purpose of combining 6WTags with 3DSearch?",
    options: [
      "To rapidly filter and refine search results using structured metadata facets",
      "To encrypt passwords with 6-word passphrases",
      "To render photorealistic ray-traced lighting",
      "To compress videos into 6-second clips"
    ],
    correctIndex: 0,
    explanation: "Stacking 6WTags (for example, Owner + Object Type + Maturity State) shrinks thousands of search hits down to the exact item you need.",
    championHint: "Instead of digging through deep folder trees, 3DEXPERIENCE lets you slice search results instantly using 6W metadata filters."
  },
  {
    id: 59,
    category: "3DSearch & 6WTags",
    question: "Under which 6WTag category would you filter items by the person who created or owns them?",
    options: [
      "Who",
      "When",
      "Where",
      "How"
    ],
    correctIndex: 0,
    explanation: "The 'Who' dimension groups people-related metadata such as Responsible/Owner, Creator, and Modifier.",
    championHint: "Looking for a person? That's always the 'Who' tag!"
  },
  {
    id: 60,
    category: "3DSearch & 6WTags",
    question: "Under which 6WTag category would you filter results by Collaborative Space or Community location?",
    options: [
      "Where",
      "Who",
      "When",
      "Why"
    ],
    correctIndex: 0,
    explanation: "The 'Where' dimension tracks where content lives—including Collaborative Spaces, Communities, and source apps.",
    championHint: "Location, location, location! Which space or community holds the file belongs under 'Where'."
  },
  {
    id: 61,
    category: "3DSearch & 6WTags",
    question: "Under which 6WTag category do you filter by object type (such as Physical Product, Drawing, or Document)?",
    options: [
      "What",
      "Who",
      "When",
      "Where"
    ],
    correctIndex: 0,
    explanation: "The 'What' dimension classifies what kind of object an item is, as well as attributes like maturity state and file format.",
    championHint: "Asking 'What kind of file is this?' leads you straight to the 'What' facet."
  },
  {
    id: 62,
    category: "3DSearch & 6WTags",
    question: "Under which 6WTag category would you narrow results to files modified within the last 7 days?",
    options: [
      "When",
      "Where",
      "Who",
      "Why"
    ],
    correctIndex: 0,
    explanation: "The 'When' dimension organizes creation date, last modification date, and timeline intervals.",
    championHint: "Dates and time ranges always live under 'When'."
  },
  {
    id: 63,
    category: "3DSearch & 6WTags",
    question: "What does the 'Colorize' feature in 6WTags let you do?",
    options: [
      "Visually color-code 3D parts or items by a chosen tag (such as Maturity State or Owner)",
      "Automatically paint physical parts on the assembly line",
      "Switch the entire browser into rainbow mode",
      "Convert black-and-white scanned PDFs into color photographs"
    ],
    correctIndex: 0,
    explanation: "Colorizing by 6WTags highlights parts directly in 3DPlay or structure views—for example, showing Released parts in green and In Work parts in blue.",
    championHint: "Imagine opening a 500-part assembly and instantly seeing which parts are Released vs. In Work by color—that's 6WTags Colorize!"
  },
  {
    id: 64,
    category: "3DSearch & 6WTags",
    question: "Which wildcard symbol is commonly used in 3DSearch to match any sequence of characters (e.g., 'bracket*')?",
    options: [
      "Asterisk (*)",
      "Dollar sign ($)",
      "Ampersand (&)",
      "Exclamation mark (!)"
    ],
    correctIndex: 0,
    explanation: "Using an asterisk (*) in 3DSearch acts as a multi-character wildcard to find partial name matches quickly.",
    championHint: "It's the universal search wildcard character used across databases and operating systems: the star / asterisk."
  },
  {
    id: 65,
    category: "3DSearch & 6WTags",
    question: "Can users attach their own custom user-defined tags to objects in 6WTags?",
    options: [
      "Yes, custom tags can be created and applied to objects for easier retrieval",
      "No, only Dassault Systèmes engineers can define tags",
      "Only if the object is in Obsolete maturity state",
      "Only on 3DSwym surveys, never on CAD objects"
    ],
    correctIndex: 0,
    explanation: "Beyond automatic system tags, users can add explicit custom tags (like project codes or keywords) to make domain-specific searches effortless.",
    championHint: "6WTags combines automatic metadata with flexible user-created tags so teams can label content their own way."
  },

  // =========================================================================
  // 7. LIFECYCLE, MATURITY & REVISIONS (66–77)
  // =========================================================================
  {
    id: 66,
    category: "Lifecycle & Revisions",
    question: "What are the five standard Maturity States in the 3DEXPERIENCE data lifecycle?",
    options: [
      "Private, In Work, Frozen, Released, and Obsolete",
      "New, Saved, Emailed, Printed, and Deleted",
      "Alpha, Beta, Gamma, Delta, and Final",
      "Open, Pending, Hold, Shipped, and Closed"
    ],
    correctIndex: 0,
    explanation: "Objects in 3DSpace follow a clean five-state maturity model: Private, In Work, Frozen, Released, and Obsolete.",
    championHint: "Memorize this classic progression from start to retirement: Private → In Work → Frozen → Released → Obsolete."
  },
  {
    id: 67,
    category: "Lifecycle & Revisions",
    question: "What is the default maturity state when a new CAD model or document is first saved to a Collaborative Space?",
    options: [
      "In Work",
      "Released",
      "Frozen",
      "Obsolete"
    ],
    correctIndex: 0,
    explanation: "New objects enter the Collaborative Space in the 'In Work' state so authorized team members can collaborate and iterate immediately.",
    championHint: "When you're actively designing a brand-new part, it naturally starts in the 'In Work' state!"
  },
  {
    id: 68,
    category: "Lifecycle & Revisions",
    question: "Who can see an object while its maturity state is set to 'Private'?",
    options: [
      "Only the object's owner",
      "All members of the Collaborative Space",
      "Everyone in the company tenant",
      "External suppliers with Public Reader access"
    ],
    correctIndex: 0,
    explanation: "The Private maturity state hides an early concept from everyone else—even teammates in the same Collaborative Space—until the owner shares it by moving it to In Work.",
    championHint: "Private maturity is your personal sandbox: nobody else can see it until you promote it to In Work."
  },
  {
    id: 69,
    category: "Lifecycle & Revisions",
    question: "When should you transition a design to the 'Frozen' maturity state?",
    options: [
      "When work is ready for formal review and you want to temporarily prevent edits without permanently releasing it",
      "When the computer stops responding and needs a reboot",
      "When you want to permanently delete the file from the server",
      "When you want anyone in the world to edit the file freely"
    ],
    correctIndex: 0,
    explanation: "Frozen locks the design against accidental edits during review; if feedback requires changes, it can still be demoted back to In Work.",
    championHint: "Think of 'Frozen' as pressing pause for a design review—no edits allowed while reviewers inspect it, yet still reversible!"
  },
  {
    id: 70,
    category: "Lifecycle & Revisions",
    question: "What does the 'Released' maturity state indicate?",
    options: [
      "The design is officially approved, read-only, and ready for production or downstream use",
      "The design has been discarded and should never be manufactured",
      "The file is currently unlocked for anyone to freely modify",
      "The file was just uploaded for the very first time"
    ],
    correctIndex: 0,
    explanation: "Released represents an approved engineering baseline—its geometry and metadata can no longer be modified in that revision.",
    championHint: "Released is the green light for manufacturing: approved, locked down, and trustworthy."
  },
  {
    id: 71,
    category: "Lifecycle & Revisions",
    question: "If an engineering change is required on a 'Released' part, what is the proper procedure?",
    options: [
      "Create a New Revision (which starts In Work) while preserving the Released revision",
      "Demote the Released part back to Private and overwrite it",
      "Delete the Released part and recreate it from memory",
      "Rename the file extension to .edit"
    ],
    correctIndex: 0,
    explanation: "Released revisions are immutable for traceability; making updates requires creating a New Revision (e.g., Rev A → Rev B).",
    championHint: "You can never un-release a Released part! Always spin up a New Revision to keep the audit trail intact."
  },
  {
    id: 72,
    category: "Lifecycle & Revisions",
    question: "Which maturity state is the ONLY valid forward transition from 'Released'?",
    options: [
      "Obsolete",
      "In Work",
      "Private",
      "Frozen"
    ],
    correctIndex: 0,
    explanation: "Once Released, a revision can never go backward—it can only remain Released or eventually be retired to Obsolete.",
    championHint: "After Released, there's only one final stop at the end of a part's life: Obsolete."
  },
  {
    id: 73,
    category: "Lifecycle & Revisions",
    question: "Why do organizations transition retired designs to 'Obsolete' instead of deleting them?",
    options: [
      "To signal the item should no longer be used while preserving historical traceability and compliance records",
      "Because 3DEXPERIENCE does not support deleting any file ever",
      "To automatically refund the cloud storage bill",
      "To make the file editable by Contributors"
    ],
    correctIndex: 0,
    explanation: "Marking outdated parts as Obsolete prevents accidental reuse in new designs while keeping complete audit history for legacy products.",
    championHint: "In PLM, history matters! Obsolete means 'do not use for new builds, but keep the record for traceability'."
  },
  {
    id: 74,
    category: "Lifecycle & Revisions",
    question: "What is the purpose of 'Locking' (previously called Reserving) a file in 3DEXPERIENCE?",
    options: [
      "To claim exclusive edit rights so teammates cannot overwrite your changes simultaneously",
      "To encrypt the file with a personal password",
      "To permanently freeze the part into Released state",
      "To hide the file from 3DSearch"
    ],
    correctIndex: 0,
    explanation: "Locking an In Work object ensures only one user can save modifications at a time, eliminating conflicting edits in collaborative teams.",
    championHint: "Think of Locking like checking out a library book to edit—others can still read it, but only you can save changes until you unlock it."
  },
  {
    id: 75,
    category: "Lifecycle & Revisions",
    question: "What does creating a 'New Revision' (e.g., from A to B) accomplish?",
    options: [
      "Creates the next tracked iteration in the same object's history while keeping earlier revisions intact",
      "Makes an unrelated copy with no history link",
      "Erases Revision A permanently",
      "Translates all part descriptions into another language"
    ],
    correctIndex: 0,
    explanation: "Revisions maintain an unbroken lineage (A, B, C...) so engineers can compare changes over time and trace which version shipped.",
    championHint: "Revisions keep the same family tree—Rev B clearly knows it evolved from Rev A!"
  },
  {
    id: 76,
    category: "Lifecycle & Revisions",
    question: "How does 'Duplicate' differ from 'New Revision'?",
    options: [
      "Duplicate creates a brand-new independent object, whereas New Revision creates a linked next iteration of the same object",
      "Duplicate only copies the file name without any 3D geometry",
      "New Revision can only be run by Readers",
      "There is no functional difference between them"
    ],
    correctIndex: 0,
    explanation: "Use New Revision to evolve an existing part number; use Duplicate when starting a separate new design based on an existing model.",
    championHint: "Same part evolving? New Revision. Brand-new part inspired by an old one? Duplicate!"
  },
  {
    id: 77,
    category: "Lifecycle & Revisions",
    question: "Which core app lets you visualize an object's maturity states, revisions, duplicates, and branches in one timeline?",
    options: [
      "Collaborative Lifecycle",
      "3DSwym",
      "Web Page Reader",
      "User Groups"
    ],
    correctIndex: 0,
    explanation: "The Collaborative Lifecycle app provides the Maturity Graph, Revision tools, Duplicate, Branch, and Compare actions in one widget.",
    championHint: "Look for the app name that literally includes the word 'Lifecycle'!"
  },

  // =========================================================================
  // 8. 3DPLAY, BOOKMARKS & DATA ORGANIZATION (78–87)
  // =========================================================================
  {
    id: 78,
    category: "3DPlay & Data Organization",
    question: "What is the main function of the 3DPlay app?",
    options: [
      "Viewing, rotating, sectioning, measuring, and annotating 3D models and 2D documents directly in the browser",
      "Playing background music while engineers model parts",
      "Managing user license invoices",
      "Sending automated marketing newsletters"
    ],
    correctIndex: 0,
    explanation: "3DPlay brings rich, zero-install 3D visualization and lightweight inspection tools to every platform user right inside their web browser.",
    championHint: "Whenever non-CAD stakeholders want to spin, slice, or measure a 3D model in their browser, 3DPlay is the go-to app!"
  },
  {
    id: 79,
    category: "3DPlay & Data Organization",
    question: "Do you need desktop CAD software (such as CATIA or SOLIDWORKS) installed on your computer to view a model in 3DPlay?",
    options: [
      "No, 3DPlay runs natively in a standard web browser",
      "Yes, a full CAD workstation license is mandatory",
      "Yes, you must install a Linux virtual machine first",
      "3DPlay only works on smartphones, never on laptops"
    ],
    correctIndex: 0,
    explanation: "Because 3DPlay runs in the browser, executives, suppliers, and reviewers can inspect 3D designs on any device without desktop CAD.",
    championHint: "That's the magic of 3DPlay—anyone with a browser and access rights can explore 3D data with zero CAD installation."
  },
  {
    id: 80,
    category: "3DPlay & Data Organization",
    question: "Which set of inspection tools is built directly into 3DPlay?",
    options: [
      "Section cut, Explode view, Measure, and Annotations",
      "SQL Query Editor, Compiler, and Debugger",
      "Spreadsheet Pivot Tables and Mail Merge",
      "Audio Equalizer and Video Chroma Key"
    ],
    correctIndex: 0,
    explanation: "3DPlay's bottom action bar provides intuitive tools to explode assemblies, slice cross-sections, take measurements, and capture annotated snapshots.",
    championHint: "Think of what a design reviewer needs during a walkthrough: slicing inside (Section), pulling parts apart (Explode), and checking sizes (Measure)."
  },
  {
    id: 81,
    category: "3DPlay & Data Organization",
    question: "What is the 'Bookmark Editor' app used for?",
    options: [
      "Organizing 3DSpace objects into structured virtual folders without duplicating the underlying files",
      "Saving favorite external news websites in Chrome",
      "Editing the typography of printed instruction manuals",
      "Tracking employee vacation days"
    ],
    correctIndex: 0,
    explanation: "Bookmark Editor gives teams familiar hierarchical folder structures to organize CAD assemblies, documents, and drawings while keeping a single source of truth.",
    championHint: "Because 3DSpace is a flat database, Bookmark Editor gives you clean virtual folders to organize projects logically!"
  },
  {
    id: 82,
    category: "3DPlay & Data Organization",
    question: "What happens when you use 'Remove' (not Delete) on an assembly inside a Bookmark folder?",
    options: [
      "Only the shortcut/reference is removed from that Bookmark; the actual assembly stays safe in 3DSpace",
      "The assembly is permanently destroyed across the entire tenant",
      "Every child part is set to Obsolete",
      "The Bookmark folder itself is deleted"
    ],
    correctIndex: 0,
    explanation: "Removing an item from a Bookmark simply unlinks it from that folder view without harming the underlying data stored in 3DSpace.",
    championHint: "Remember the crucial difference: 'Remove' takes the shortcut out of the bookmark; 'Delete' erases the actual database object!"
  },
  {
    id: 83,
    category: "3DPlay & Data Organization",
    question: "Can the exact same standard bolt be linked inside multiple different Bookmarks at the same time?",
    options: [
      "Yes, Bookmarks reference the single source of truth without creating redundant file copies",
      "No, every object can belong to at most one Bookmark",
      "Only if you duplicate the file for each Bookmark",
      "Only after converting the bolt to a PDF"
    ],
    correctIndex: 0,
    explanation: "Because Bookmarks hold references rather than physical file copies, one part can cleanly appear in Project A, Project B, and a Hardware Favorites bookmark simultaneously.",
    championHint: "No more messy duplicate copies! Bookmarks act like smart pointers to the exact same single source of truth."
  },
  {
    id: 84,
    category: "3DPlay & Data Organization",
    question: "What is the 'Product Structure Explorer' app primarily used for?",
    options: [
      "Navigating, inspecting, and managing multi-level product assemblies alongside an interactive 3D view",
      "Browsing public social media profiles",
      "Designing website CSS stylesheets",
      "Scanning paper invoices with OCR"
    ],
    correctIndex: 0,
    explanation: "Product Structure Explorer displays the full hierarchical tree (BOM/assembly structure) synchronized with a live 3D viewport.",
    championHint: "Its name gives it away: it lets you explore the full parent-child structure of a product assembly!"
  },
  {
    id: 85,
    category: "3DPlay & Data Organization",
    question: "What does the 'Relations' app help engineers visualize?",
    options: [
      "Connected dependencies around an object—such as Where Used assemblies, drawings, attachments, and change actions",
      "Company org charts and employee reporting lines",
      "Network latency between cloud data centers",
      "Social friendships between 3DSwym users"
    ],
    correctIndex: 0,
    explanation: "Relations displays an interactive graph showing everything linked to a selected item, helping engineers assess impact before making any change.",
    championHint: "Before modifying a part, open Relations to see every drawing, assembly, or document connected to it!"
  },
  {
    id: 86,
    category: "3DPlay & Data Organization",
    question: "What does a 'Where Used' query reveal about a component?",
    options: [
      "All higher-level assemblies or documents that reference that component",
      "The physical GPS coordinates of the engineer's laptop",
      "Which web browsers have opened the file",
      "The total electricity consumed to render the file"
    ],
    correctIndex: 0,
    explanation: "Where Used instantly traces upward from a component to every parent assembly referencing it, preventing unintended breakages during redesigns.",
    championHint: "Think impact analysis: 'Where is this screw or bracket used across our products?'—that's Where Used!"
  },
  {
    id: 87,
    category: "3DPlay & Data Organization",
    question: "What is the 'Compare' app used for on the 3DEXPERIENCE platform?",
    options: [
      "Comparing two revisions or product structures side-by-side in both tree structure and 3D geometry",
      "Comparing cloud subscription prices from rival vendors",
      "Benchmarking laptop CPU clock speeds",
      "Checking spelling differences between two chat messages"
    ],
    correctIndex: 0,
    explanation: "Compare highlights added, removed, moved, or modified components both in the BOM tree and directly with color-coded 3D overlays.",
    championHint: "Need to spot what changed between Revision A and Revision B? The Compare app highlights both tree and 3D differences!"
  },

  // =========================================================================
  // 9. TASKS, ISSUES, ROUTES & CHANGE MANAGEMENT (88–96)
  // =========================================================================
  {
    id: 88,
    category: "Tasks, Issues & Change",
    question: "What is the 'Collaborative Tasks' app used for?",
    options: [
      "Creating, assigning, and tracking personal or team work items across lifecycle states",
      "Automating 3D surface lofting commands",
      "Monitoring server CPU temperature",
      "Creating public marketing landing pages"
    ],
    correctIndex: 0,
    explanation: "Collaborative Tasks keeps daily action items organized with assignees, due dates, context attachments, and clear status progression.",
    championHint: "It's your built-in task board on 3DEXPERIENCE—perfect for assigning and tracking work with real CAD context attached."
  },
  {
    id: 89,
    category: "Tasks, Issues & Change",
    question: "What visual board layout is commonly used in Collaborative Tasks to drag work across To Do, In Work, and Completed?",
    options: [
      "A Kanban-style status board",
      "A 3D wireframe mesh",
      "A geographic heat map",
      "A pie chart only"
    ],
    correctIndex: 0,
    explanation: "Collaborative Tasks offers a clean Kanban column view (To Do, In Work, Completed) where users simply drag cards as work progresses.",
    championHint: "Drag cards left to right across columns like To Do → In Work → Completed—that classic Agile visual is a Kanban board!"
  },
  {
    id: 90,
    category: "Tasks, Issues & Change",
    question: "How can you connect relevant CAD models or specifications directly to a task in Collaborative Tasks?",
    options: [
      "By dragging them into the task's Attachments or Deliverables sections",
      "By printing them and scanning a QR code",
      "Tasks only accept plain text and cannot link to platform objects",
      "By emailing them to an external inbox"
    ],
    correctIndex: 0,
    explanation: "Linking files as Attachments (inputs) and Deliverables (outputs) lets the assignee jump straight to the exact model without hunting for it.",
    championHint: "One of the biggest perks of platform tasks: drag reference models into Attachments and finished work into Deliverables!"
  },
  {
    id: 91,
    category: "Tasks, Issues & Change",
    question: "What is the 'Issue Management' app designed for?",
    options: [
      "Logging, assigning, and tracking design defects, review findings, or quality problems linked to affected items",
      "Publishing monthly digital magazines",
      "Resetting forgotten Wi-Fi passwords",
      "Generating random serial numbers for factories"
    ],
    correctIndex: 0,
    explanation: "Issue Management captures formal issues—often pinpointed directly on 3D geometry—with priority, owners, due dates, and resolution status.",
    championHint: "Spot a clearance clash or missing chamfer during a review? Log it in Issue Management so it never slips through the cracks!"
  },
  {
    id: 92,
    category: "Tasks, Issues & Change",
    question: "What is a '3D Markup' on the 3DEXPERIENCE platform?",
    options: [
      "A saved collection of annotated 3D views, callouts, and slides attached to a product for design review",
      "A financial price increase added to a product's retail cost",
      "An HTML source file for styling dashboards",
      "A permanent cut carved into the actual CAD solid"
    ],
    correctIndex: 0,
    explanation: "3D Markups capture interactive camera angles, arrows, measurements, and notes on top of a 3D product without modifying the underlying CAD geometry.",
    championHint: "Think of sticky notes and redline drawings—but directly in 3D space, stored cleanly alongside the product!"
  },
  {
    id: 93,
    category: "Tasks, Issues & Change",
    question: "What is the 'Route Management' app used for?",
    options: [
      "Defining and running structured multi-step review, approval, or notification workflows among people",
      "Calculating GPS driving directions for delivery trucks",
      "Routing Ethernet cables in a data center",
      "Designing electrical wire harnesses inside a car"
    ],
    correctIndex: 0,
    explanation: "Routes automate sequential or parallel sign-off processes—for example, sending a drawing to Engineering Lead, then Quality, for formal approval.",
    championHint: "In PLM, a 'Route' routes a document or design from reviewer to reviewer until every required approval is signed!"
  },
  {
    id: 94,
    category: "Tasks, Issues & Change",
    question: "What is the purpose of a 'Change Action' in 3DEXPERIENCE?",
    options: [
      "To formally authorize, execute, track, and approve engineering modifications with complete traceability",
      "To switch the platform interface language from English to French",
      "To change a user's profile avatar photo",
      "To rename a 3DDashboard tab"
    ],
    correctIndex: 0,
    explanation: "A Change Action governs controlled engineering changes—defining what may be modified, who performs the work, and who approves the final release.",
    championHint: "In formal PLM governance, no Released part changes without a paper trail—that controlled change container is a Change Action!"
  },
  {
    id: 95,
    category: "Tasks, Issues & Change",
    question: "Inside a Change Action, what is the difference between 'Proposed Changes' and 'Realized Changes'?",
    options: [
      "Proposed Changes specify planned modifications, while Realized Changes automatically log the actual edits performed",
      "Proposed Changes are deleted after 24 hours, while Realized Changes are optional notes",
      "Proposed Changes apply only to PDFs, while Realized Changes apply only to images",
      "They are identical lists filled out manually twice"
    ],
    correctIndex: 0,
    explanation: "Proposed Changes define the intended scope upfront; as the engineer revises and updates models under the Change Action, Realized Changes automatically records the truth.",
    championHint: "Plan vs. Reality: 'Proposed' is what you plan to change; 'Realized' is the automatic record of what actually changed!"
  },
  {
    id: 96,
    category: "Tasks, Issues & Change",
    question: "Which app helps project managers schedule milestones, task dependencies, and timelines in a Gantt view?",
    options: [
      "Project Planning",
      "3DPlay",
      "3DDrive",
      "Bookmark Editor"
    ],
    correctIndex: 0,
    explanation: "Project Planning connects schedules, milestones, resources, and deliverables directly to the live engineering data on the platform.",
    championHint: "Milestones + Gantt chart + task dependencies = Project Planning!"
  },

  // =========================================================================
  // 10. BRANDS, ROLES & ADMINISTRATION (97–105)
  // =========================================================================
  {
    id: 97,
    category: "Brands, Roles & Admin",
    question: "Which Dassault Systèmes brand on the 3DEXPERIENCE platform is renowned for advanced 3D mechanical, surfacing, and systems engineering?",
    options: [
      "CATIA",
      "NETVIBES",
      "BIOVIA",
      "3DVIA"
    ],
    correctIndex: 0,
    explanation: "CATIA is Dassault Systèmes' flagship engineering and design brand, widely used in aerospace, automotive, industrial equipment, and systems engineering.",
    championHint: "Think aerospace, automotive Class-A surfacing, and flagship 3D engineering—that's CATIA!"
  },
  {
    id: 98,
    category: "Brands, Roles & Admin",
    question: "Which Dassault Systèmes brand specializes in realistic multiphysics simulation and finite element analysis (powered by Abaqus and more)?",
    options: [
      "SIMULIA",
      "ENOVIA",
      "DELMIA",
      "SOLIDWORKS"
    ],
    correctIndex: 0,
    explanation: "SIMULIA delivers structural, fluid (CFD), electromagnetic, and multibody simulation capabilities integrated into the 3DEXPERIENCE platform.",
    championHint: "Look right at the root of the brand name: SIMULIA = Simulation!"
  },
  {
    id: 99,
    category: "Brands, Roles & Admin",
    question: "Which Dassault Systèmes brand focuses on digital manufacturing, factory simulation, robotics, and supply chain operations?",
    options: [
      "DELMIA",
      "CATIA",
      "NETVIBES",
      "BIOVIA"
    ],
    correctIndex: 0,
    explanation: "DELMIA bridges virtual engineering and real-world production—covering process planning, robotics, machining, MES, and supply chain optimization.",
    championHint: "When a design moves from engineering to the factory floor, robotics, and manufacturing operations, DELMIA leads the way."
  },
  {
    id: 100,
    category: "Brands, Roles & Admin",
    question: "Which Dassault Systèmes brand powers PLM governance, lifecycle management, change control, and enterprise collaboration?",
    options: [
      "ENOVIA",
      "SIMULIA",
      "GEOVIA",
      "BIOVIA"
    ],
    correctIndex: 0,
    explanation: "ENOVIA provides the collaborative PLM backbone—managing product structures, requirements, changes, projects, and enterprise governance.",
    championHint: "Think 'Enterprise Innovation' and PLM governance—ENOVIA is the backbone of collaborative lifecycle management."
  },
  {
    id: 101,
    category: "Brands, Roles & Admin",
    question: "Which Dassault Systèmes brand delivers real-time dashboards, market intelligence, and big-data analytics in the East quadrant?",
    options: [
      "NETVIBES",
      "DELMIA",
      "SIMULIA",
      "CATIA"
    ],
    correctIndex: 0,
    explanation: "NETVIBES powers Information Intelligence on the platform, aggregating internal and external data streams into actionable insights.",
    championHint: "Think 'vibes' from the web and enterprise data—NETVIBES is the Information Intelligence brand!"
  },
  {
    id: 102,
    category: "Brands, Roles & Admin",
    question: "Which Dassault Systèmes brand is dedicated to life sciences, chemistry, formulation, and materials science modeling?",
    options: [
      "BIOVIA",
      "GEOVIA",
      "DELMIA",
      "ENOVIA"
    ],
    correctIndex: 0,
    explanation: "BIOVIA provides scientific modeling, laboratory informatics, and materials/life-sciences innovation tools on the 3DEXPERIENCE platform.",
    championHint: "The prefix 'BIO-' points straight to biology, chemistry, and life sciences!"
  },
  {
    id: 103,
    category: "Brands, Roles & Admin",
    question: "What is the '3DSwymer' (formerly Collaborative Business Innovator) role?",
    options: [
      "The foundational base role required for every user to access core collaboration apps like 3DDashboard, 3DSwym, 3DDrive, and 3DPlay",
      "An advanced aerospace composites manufacturing role",
      "An optional theme pack for dark mode icons",
      "A read-only role reserved exclusively for external auditors"
    ],
    correctIndex: 0,
    explanation: "3DSwymer is the entry prerequisite for every 3DEXPERIENCE user, unlocking dashboards, communities, cloud drive, search, and browser-based 3D viewing.",
    championHint: "Every single user on the platform starts with this base collaboration role before adding specialized engineering roles!"
  },
  {
    id: 104,
    category: "Brands, Roles & Admin",
    question: "What key capability does the 'Collaborative Industry Innovator' role add on top of 3DSwymer?",
    options: [
      "Structured PLM data management including 3DSpace, Collaborative Lifecycle, Bookmarks, Tasks, Issues, and Routes",
      "Only extra color themes for 3DSwym",
      "Unrestricted free access to every SIMULIA solver",
      "Local PC antivirus protection"
    ],
    correctIndex: 0,
    explanation: "Collaborative Industry Innovator equips teams with full cloud PLM tools to store, revise, organize, and govern CAD and engineering data in 3DSpace.",
    championHint: "3DSwymer = Business/Social collaboration; Collaborative Industry Innovator = Industrial PLM (3DSpace, Lifecycle, Bookmarks, Issues, Tasks)!"
  },
  {
    id: 105,
    category: "Brands, Roles & Admin",
    question: "Which app does a Platform Administrator use to invite members, assign roles/licenses, and configure tenant policies?",
    options: [
      "Platform Management",
      "3DPlay",
      "Bookmark Editor",
      "Product Structure Explorer"
    ],
    correctIndex: 0,
    explanation: "Platform Management is the central administration dashboard for managing members, role assignments, collaborative spaces, and tenant governance.",
    championHint: "Look for the straightforward administrative app name—managing the entire platform happens in Platform Management!"
  }
];
