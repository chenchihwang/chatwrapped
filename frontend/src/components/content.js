let content = [
  {
    title: "Your Favorite Phrase",
    text: "You emoted 21,000 times this cycle",
    subtext: "You talked for about 86,000 minutes, equivalent to 2.5 tide cycles",
  },
  { title: "Step 2", text: "This is the second step." },
  { title: "Step 3", text: "This is the third step." },
  { title: "Step 4", text: "This is the fourth step." },
  { title: "Step 5", text: "This is the fifth step." },
  { title: "Step 6", text: "This is the sixth step." }
];

export const updateContent = (userData) => {
  content = [
    {
      title: "Favorite Label",
      text: userData.favorite_label,
      subtext: "This is your favorite label."
    },
    {
      title: "Favorite Keywords",
      text: userData.favorite_keyword.join(", "),
      subtext: "These are your favorite keywords."
    },
    {
      title: "Average Messages Per Day",
      text: userData.avg_messages_per_day,
      subtext: "This is your average messages per day."
    },
    {
      title: "Average Words Per Message",
      text: userData.avg_words_per_message,
      subtext: "This is your average words per message."
    },
    {
      title: "Dryness Score",
      text: userData.dryness,
      subtext: "This is your dryness score."
    },
    {
      title: "Humor Score",
      text: userData.humor,
      subtext: "This is your humor score."
    },
    {
      title: "Longest Active Conversation",
      text: userData.longest_active_conv,
      subtext: "This is your longest active conversation."
    },
    {
      title: "Most Active Day",
      text: userData.most_active_day,
      subtext: "This is your most active day."
    },
    // Add more fields as needed
  ];
};

export default content;