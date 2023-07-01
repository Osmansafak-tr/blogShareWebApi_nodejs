class AppError extends Error{
    constructor(errorConstant, message){
        super(message);
        this.type = errorConstant.type;
        this.errorCode = errorConstant.errorCode;
        this.status = errorConstant.status;
    };
}

module.exports = AppError;