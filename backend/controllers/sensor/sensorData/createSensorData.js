const Joi = require("joi");
const SensorModel = require("../../../models/SensorModels");
const ProjectModel = require("../../../models/projectModel");
const UserModel = require("../../../models/userModel");
// const sendEmail = require("../../../utils/email");

const lastEmailSentTime = {};

const sendSensorData = async (req, res) => {
  // Validate params (MongoDB → string ObjectId)
  const paramsSchema = Joi.object({
    projectId: Joi.string().required(),
    sensorId: Joi.string().required(),
  });

  // Validate body
  const bodySchema = Joi.object({
    value: Joi.number().required(),
  });

  const { error: pErr, value: pVal } = paramsSchema.validate(req.params);
  if (pErr) {
    return res.status(400).json({
      status: "error",
      message: pErr.message,
    });
  }

  const { error: bErr, value: bVal } = bodySchema.validate(req.body);
  if (bErr) {
    return res.status(400).json({
      status: "error",
      message: bErr.message,
    });
  }

  try {
    // Check project exists
    const project = await ProjectModel.findProjectById(pVal.projectId);
    if (!project) {
      return res.status(404).json({
        status: "error",
        message: "Project not found",
      });
    }

    // Check sensor exists
    const sensor = await SensorModel.findSensorById(pVal.sensorId);
    if (!sensor) {
      return res.status(404).json({
        status: "error",
        message: "Sensor not found",
      });
    }

    // Ensure sensor belongs to project
    if (sensor.project.toString() !== pVal.projectId) {
      return res.status(400).json({
        status: "error",
        message: "Sensor does not belong to this project",
      });
    }

    // Store sensor data
    const sensorData = await SensorModel.createSensorData({
      sensor: pVal.sensorId,
      value: bVal.value,
    });

    console.log("📡 Sensor data received →", sensorData.value);

    // // 🚨 Threshold check
    // if (
    //   sensor.minThreshold !== undefined &&
    //   sensor.maxThreshold !== undefined &&
    //   (sensorData.value < sensor.minThreshold ||
    //     sensorData.value > sensor.maxThreshold)
    // ) {
    //   const userEmail = project.ownerEmail || project.owner?.email;

    //   if (userEmail) {
    //     const now = Date.now();
    //     const last = lastEmailSentTime[sensor._id] || 0;

    //     // ✅ Cooldown: 15 minutes
    //     if (now - last > 15 * 60 * 1000) {
    //       await sendEmail(
    //         userEmail,
    //         "🚨 Sensor Alert",
    //         `Sensor "${sensor.sensorName}" value ${sensorData.value} is out of range.\n\nMin: ${sensor.minThreshold}\nMax: ${sensor.maxThreshold}`,
    //       );

    //       lastEmailSentTime[sensor._id] = now;

    //       console.log("📧 Alert email sent →", userEmail);
    //     }
    //   }
    // }

    return res.status(201).json({
      status: "success",
      message: "Sensor data stored",
      sensorData,
    });
  } catch (err) {
    console.error("Sensor Data Error:", err);

    return res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

module.exports = sendSensorData;
