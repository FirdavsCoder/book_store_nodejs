const DataSource = require("../lib/dataSource")
const path = require("path")
const ResponseData = require("../lib/responseData")

const statisticsDatabasePath = path.join(__dirname, "../database/statistics.json")
const statisticsData = new DataSource(statisticsDatabasePath)


//@route                GET /statistics
//@desc                 Get Statistics
//@access               Public
const getAllStatistics = async (req, res) => {
    const statisticsData1 = statisticsData.read()
    res.status(200).json(new ResponseData("Success", statisticsData1));
}

//@route                GET /statistics/:id
//@desc                 Get Statistics
//@access               Public
const getStatisticDataById = async(req, res) => {
    const statistics = statisticsData.read();
    const statisticsId = req.params.id
    const foundStatistics = statistics.find((statistic) => statistic.id === Number(statisticsId));

    if (foundStatistics) {
        res.status(200).json(new ResponseData("Success!", foundStatistics, null))
    } else {
        res.status(404).json(new ResponseData("Statistics not found!", null, null))
    }
}

module.exports = {
    getAllStatistics,
    getStatisticDataById
}