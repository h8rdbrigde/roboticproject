makerbit.onUltrasonicObjectDetected(10, DistanceUnit.CM, function () {
    pins.servoWritePin(AnalogPin.P0, 90)
    pins.servoWritePin(AnalogPin.P1, 90)
    basic.pause(200)
    pins.servoWritePin(AnalogPin.P0, 125)
    pins.servoWritePin(AnalogPin.P1, 125)
})
let x1 = 0
huskylens.initI2c()
huskylens.initMode(protocolAlgorithm.ALGORITHM_LINE_TRACKING)
huskylens.writeOSD("Testing...", 150, 30)
makerbit.connectUltrasonicDistanceSensor(DigitalPin.P5, DigitalPin.P8)
NPNBitKit.Led2ColorAnalog(AnalogPin.P3, 100, AnalogPin.P4, 0)
while (true) {
    NPNBitKit.Led2ColorAnalog(AnalogPin.P3, 0, AnalogPin.P4, 100)
}
basic.forever(function () {
    huskylens.request()
    if (huskylens.isLearned(1)) {
        if (huskylens.isAppear_s(HUSKYLENSResultType_t.HUSKYLENSResultBlock)) {
            x1 = huskylens.readeArrow(1, Content2.xOrigin)
        }
    }
    if (x1 >= 150 && x1 <= 170) {
        NPNBot.setMotorSpeed(MotorShaftDirection.forward, 80, 100)
    }
    if (x1 >= 130 && x1 <= 150) {
        NPNBot.setMotorSpeed(MotorShaftDirection.turnLeft, 60, 100)
        NPNBot.setMotorSpeed(MotorShaftDirection.turnRight, 100, 100)
    }
    if (x1 >= 110 && x1 <= 130) {
        NPNBot.setMotorSpeed(MotorShaftDirection.turnLeft, 50, 100)
        NPNBot.setMotorSpeed(MotorShaftDirection.turnRight, 110, 100)
    }
    if (x1 < 110) {
        NPNBot.setMotorSpeed(MotorShaftDirection.turnLeft, 40, 100)
        NPNBot.setMotorSpeed(MotorShaftDirection.turnRight, 120, 100)
    }
    if (x1 > 190 && x1 <= 210) {
        NPNBot.setMotorSpeed(MotorShaftDirection.turnLeft, 110, 100)
        NPNBot.setMotorSpeed(MotorShaftDirection.turnRight, 50, 100)
        if (x1 > 210) {
            NPNBot.setMotorSpeed(MotorShaftDirection.turnRight, 40, 100)
            NPNBot.setMotorSpeed(MotorShaftDirection.turnLeft, 120, 100)
        }
    }
})
