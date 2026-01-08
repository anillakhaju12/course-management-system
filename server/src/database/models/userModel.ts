
import {Table, Model, Column, DataType} from 'sequelize-typescript'
import {v4 as uuidv4} from 'uuid'

@Table({
  tableName : "users", // name of the table
  modelName : "User", //name that we use to access data of users table
  timestamps : true // time stamps when the data was inserted
})
 //we keep the class name as modelName of easy Understand
class User extends Model{

  @Column({
    primaryKey : true,
    type : DataType.UUID,
    defaultValue : ()=> uuidv4(),
    allowNull : false 
  })
  declare id : string

  @Column({
    type : DataType.STRING //datatype of data that will be store in this column
  })
  declare username : string // name of the column

  @Column({
    type : DataType.STRING
  })
  declare email : string 

  @Column({
    type : DataType.STRING
  })
  declare password : string 

  @Column({
    type : DataType.ENUM('teacher','institute','super-admin','student'),
    defaultValue : 'student'
  })
  declare role : string 
  @Column({
    type : DataType.STRING,
  })
  declare currentInstituteNumber : string

}





export default User