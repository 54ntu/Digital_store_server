import { Table, Column, Model, DataType, HasMany } from "sequelize-typescript"
import PasswordResetSession from "./passwordResetSession.model.js";

@Table({
    tableName: "users",
    modelName: "User",
    timestamps: true
})

class User extends Model {
    @Column({
        primaryKey: true,
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4
    })
    declare id: string;


    @HasMany(() => PasswordResetSession)
    declare passwordResetSessions: PasswordResetSession[];


    @Column({
        type: DataType.STRING
    })
    declare username: string;

    @Column({
        type: DataType.STRING,
        unique: true
    })
    declare email: string

    @Column({
        type: DataType.STRING
    })
    declare password: string

    @Column({
        type: DataType.ENUM('customer', 'admin'),
        defaultValue: 'customer'
    })
    declare role: string

}

export default User;