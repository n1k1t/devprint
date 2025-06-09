import dotenv from 'dotenv';

const config = dotenv.config();

export default {
  ignore: (config.parsed?.DEVPRINT_COMMIT_MESSAGE_IGNORE ?? '')
    .split(';')
    .map((segment) => segment.trim())
    .filter((segment) => segment.length),
};
