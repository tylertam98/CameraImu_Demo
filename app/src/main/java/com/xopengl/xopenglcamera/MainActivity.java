package com.xopengl.xopenglcamera;

import android.Manifest;
import android.content.Context;
import android.hardware.Sensor;
import android.hardware.SensorEvent;
import android.hardware.SensorEventListener;
import android.hardware.SensorManager;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.Menu;
import android.view.View;
import android.widget.TextView;

import com.tbruyelle.rxpermissions2.RxPermissions;
import com.xopengl.xopenglcamera.camera.MyOpenGLView;
import com.xopengl.xopenglcamera.camera.config.FilterType;
import com.xopengl.xopenglcamera.camera.filter.FlipFilter;
import com.xopengl.xopenglcamera.camera.filter.ScreenFilter;

import io.reactivex.functions.Consumer;

public class MainActivity extends AppCompatActivity {
    MyOpenGLView myOpenGlView;

    private SensorManager sensorManager;
    private TextView accxText;
    private TextView accyText;
    private TextView acczText;
    private TextView gyroxText;
    private TextView gyroyText;
    private TextView gyrozText;
    private TextView magxText;
    private TextView magyText;
    private TextView magzText;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        checkPermissionRequest();
        setContentView(R.layout.activity_main);
        accxText = (TextView) findViewById(R.id.accx);
        accyText = (TextView) findViewById(R.id.accy);
        acczText = (TextView) findViewById(R.id.accz);
        gyroxText = (TextView) findViewById(R.id.gyrox);
        gyroyText = (TextView) findViewById(R.id.gyroy);
        gyrozText = (TextView) findViewById(R.id.gyroz);
        magxText = (TextView) findViewById(R.id.magx);
        magyText = (TextView) findViewById(R.id.magy);
        magzText = (TextView) findViewById(R.id.magz);
        sensorManager = (SensorManager) getSystemService(Context.SENSOR_SERVICE);
        Sensor sensora = sensorManager.getDefaultSensor(Sensor.TYPE_ACCELEROMETER);
        sensorManager.registerListener(listenera, sensora, SensorManager.SENSOR_DELAY_GAME);
        Sensor sensorg = sensorManager.getDefaultSensor(Sensor.TYPE_GYROSCOPE);
        sensorManager.registerListener(listenerg, sensorg, SensorManager.SENSOR_DELAY_GAME);
        Sensor sensorm = sensorManager.getDefaultSensor(Sensor.TYPE_MAGNETIC_FIELD);
        sensorManager.registerListener(listenerm, sensorm, SensorManager.SENSOR_DELAY_GAME);
    }

    public void checkPermissionRequest() {
        RxPermissions permissions = new RxPermissions(this);
        permissions.setLogging(true);
        permissions.request(Manifest.permission.CAMERA)
                .subscribe(new Consumer<Boolean>() {
                    @Override
                    public void accept(Boolean aBoolean) throws Exception {
                        if (aBoolean) {
                            setContentView(R.layout.activity_main);
                            myOpenGlView = findViewById(R.id.myOpenGlView);
                        }
                    }
                });
    }

    private SensorEventListener listenera = new SensorEventListener() {
        @Override
        public void onSensorChanged(SensorEvent event) {
            float accx = event.values[0];
            float accy = event.values[1];
            float accz = event.values[2];
            accxText.setText("accx:" + accx);
            accyText.setText("accy:" + accy);
            acczText.setText("accz:" + accz);
        }

        @Override
        public void onAccuracyChanged(Sensor sensor, int accuracy) {

        }

    };


    private SensorEventListener listenerg = new SensorEventListener() {
        @Override
        public void onSensorChanged(SensorEvent event) {
            float gyrox = event.values[0];
            float gyroy = event.values[1];
            float gyroz = event.values[2];
            gyroxText.setText("gyrox:" + gyrox);
            gyroyText.setText("gyroy:" + gyroy);
            gyrozText.setText("gyroz:" + gyroz);
        }

        @Override
        public void onAccuracyChanged(Sensor sensor, int accuracy) {

        }
    };

    private SensorEventListener listenerm = new SensorEventListener() {
        @Override
        public void onSensorChanged(SensorEvent event) {
            float magx = event.values[0];
            float magy = event.values[1];
            float magz = event.values[2];
            magxText.setText("magx:" + magx);
            magyText.setText("magy:" + magy);
            magzText.setText("magz:" + magz);
        }

        @Override
        public void onAccuracyChanged(Sensor sensor, int accuracy) {

        }

    };


}

