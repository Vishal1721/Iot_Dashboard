const ProjectModel = require("../../models/projectModel");
const Joi = require("joi");
const getProjectsByUserId = async (req, res) => {
    const schmema = Joi.object({
        userId: Joi.string().hex().length(24).required()
    });
  const { error } = schmema.validate(req.params);
  if (error) {
    return res.status(400).json({
      status: "error",
      message: error.details[0].message
    });
  }
  try {
    const userId = req.user.id;

    const projects = await ProjectModel.findByUserId(userId);

    console.log("projects →", projects);

    return res.status(200).json({
      status: "success",
      count: projects.length,
      projects,
    });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

module.exports = getProjectsByUserId;
