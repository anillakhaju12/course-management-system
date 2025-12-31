
import {config} from 'dotenv'

config()

const envConfig = {
  portNumber : process.env.PORT || 3299
}

export default envConfig