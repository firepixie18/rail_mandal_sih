export default async (schema, data, next) => {
  try {
    const validation = await schema.validateAsync(data);
    if (validation.error) {
      let errorReason =
        validation.error.details !== undefined
          ? validation.error.details[0].message
          : "Parameter missing or parameter type is wrong";
      return { valid: false, errorReason };
    }
    return { valid: true };
  } catch (err) {
    console.error(err.stack);
  }
};
