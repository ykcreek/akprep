// Fake database — replace with Firebase Auth later
export const clients = {
  "emma.wilson@gmail.com": {
    name: "Emma Wilson",
    package: "Growth Pack",
    amount: 750,
    joined: new Date('2025-03-18'),
    messages: [
      { from: "you", text: "Welcome Emma! Please upload your personal statement draft", date: new Date('2025-03-18') },
      { from: "client", text: "Here it is!", date: new Date('2025-03-19') },
      { from: "you", text: "Great start — I left comments in the doc", date: new Date('2025-03-20') },
    ],
    theirFiles: [
      { name: "Personal_Statement_v1.docx", size: "48 KB", uploaded: "2025-03-19" },
    ],
    yourFiles: [
      { name: "Feedback_v1_Emma.docx", size: "89 KB", uploaded: "2025-03-20" },
      { name: "Final_Version_Approved.pdf", size: "212 KB", uploaded: "2025-03-24" },
    ]
  },
  "liamchen@outlook.com": { /* another client */ }
}

// For demo: just change this email to "log in" as different clients
export let currentClientEmail = "emma.wilson@gmail.com"
