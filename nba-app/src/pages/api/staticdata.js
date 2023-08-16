const symptomsData = {
  data: [
    { airport: "1", airline: "1" },
    { airport: "2", airline: "2" },
    { airport: "3", airline: "3" },
    { airport: "4", airline: "4" },
    { airport: "5", airline: "5" },
    { airport: "6", airline: "6" },
    { airport: "7", airline: "7" },
    { airport: "8", airline: "8" },
    { airport: "9", airline: "9" },
    { airport: "10", airline: "10" },
    { airport: "11", airline: "11" },
  ],
};

export default function handler(req, res) {
  res.status(200).json(symptomsData);
}
