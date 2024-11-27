
export const pieChartOptions = {
    legend: "none", // This removes the legend
    title: "My Daily Activities",
    backgroundColor: '#1f1f1f',
    titleTextStyle: { color: 'white' },
    legendTextStyle: { color: 'white' },

    colors: ["#003f5c", "#58508d", "#bc5090", "#ff6361", "#ffa600"], // Custom colors

    pieSliceBorderColor: "#000000", // Border color (black in this case)
    
};


export const columnChartOptions={
  title: "<Month> Spending",
  backgroundColor: '#1f1f1f',
  titleTextStyle: { color: 'white' },
  legend: "none", // This removes the legend
  colors: ["#4285F4", "#DB4437", "#F4B400"], // Custom slice colors
  pieSliceBorderColor: "#000000", // Border color (black in this case)
  pieSliceText: "value", // Optional, text displayed on slices
};

export const barChartoptions = {
    isStacked: true, // Stack segments in one bar
    title: "Monthly total",
    bar: { groupWidth: "95%" },
    legend: { position: "none" },
    backgroundColor: '#1f1f1f',
    colors: ["#003f5c", "#58508d", "#bc5090", "#ff6361", "#ffa600"], // Custom colors
    pieSliceText: "value", // Optional, text displayed on slices
    titleTextStyle: {
      color: "white", // Title text color (orange)
      fontSize: 20, // Optional: Font size htmlFor the title
      bold: true, // Optional: Bold title text
    },
    hAxis: {
      title: "Values",
      textStyle: {
        color: "white", // Horizontal axis labels color (green)
        fontSize: 12, // Optional: Font size htmlFor horizontal axis labels
      },
      titleTextStyle: {
        color: "white", // Horizontal axis title color
      },
    },


    vAxis: {
      textStyle: {
        color: "white", // Vertical axis labels color (blue)
        fontSize: 12, // Optional: Font size htmlFor vertical axis labels
      },
      titleTextStyle: {
        color: "white", // Vertical axis title color
      },
    },
};

export const data = [
    { label: "Food", color: "#003f5c" },
    { label: "Transportation", color: "#58508d" },
    { label: "Utilities", color: "#bc5090" },
    { label: "Entertainment", color: "#ff6361" },
    { label: "Others", color: "#ffa600" },
];
