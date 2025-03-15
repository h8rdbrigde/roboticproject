def on_ultrasonic_object_detected_cm():
    pins.servo_write_pin(AnalogPin.P0, 90)
    pins.servo_write_pin(AnalogPin.P1, 90)
    basic.pause(200)
    pins.servo_write_pin(AnalogPin.P0, 125)
    pins.servo_write_pin(AnalogPin.P1, 125)
makerbit.on_ultrasonic_object_detected(10, DistanceUnit.CM, on_ultrasonic_object_detected_cm)

x1 = 0
huskylens.init_i2c()
huskylens.init_mode(protocolAlgorithm.ALGORITHM_LINE_TRACKING)
huskylens.write_osd("Testing...", 150, 30)
makerbit.connect_ultrasonic_distance_sensor(DigitalPin.P5, DigitalPin.P8)
NPNBitKit.led2_color_analog(AnalogPin.P3, 100, AnalogPin.P4, 0)
while True:
    NPNBitKit.led2_color_analog(AnalogPin.P3, 0, AnalogPin.P4, 100)

def on_forever():
    global x1
    huskylens.request()
    if huskylens.is_learned(1):
        if huskylens.isAppear_s(HUSKYLENSResultType_t.HUSKYLENS_RESULT_BLOCK):
            x1 = huskylens.reade_arrow(1, Content2.X_ORIGIN)
basic.forever(on_forever)
