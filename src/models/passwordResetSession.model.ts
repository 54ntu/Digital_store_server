import { Table, Column, Model, DataType, PrimaryKey, ForeignKey, BelongsTo } from "sequelize-typescript"
import User from "./user.model.js";


@Table({
    tableName: "password_reset_sessions",
    modelName: "PasswordResetSession",
    timestamps: true
})


class PasswordResetSession extends Model {

    @Column({
        primaryKey: true,
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4
    })
    declare id: string;


    @ForeignKey(() => User)
    @Column({
        type: DataType.UUID,
        allowNull: false
    })
    declare userId: string;

    @BelongsTo(() => User)
    declare user: User;


    @Column({
        type: DataType.STRING,
        allowNull: false
    })

    declare otpHash: string;


    @Column({
        type: DataType.BIGINT,
        allowNull: false
    })
    declare expiresAt: bigint;

    @Column({
        type: DataType.BOOLEAN,
        defaultValue: false
    })
    declare verified: boolean;

    @Column({
        type: DataType.INTEGER,
        defaultValue: 0
    })
    declare attempts: number;

}



export default PasswordResetSession;