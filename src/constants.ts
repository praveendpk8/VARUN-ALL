import { District } from './types';

export const STEM_CITY_DATA: District[] = [
  {
    id: 'robotics',
    name: 'Robotics Ridge',
    description: 'Build and program your own mechanical friends with Arduino!',
    icon: 'Bot',
    color: 'bg-stem-blue',
    topics: [
      {
        id: 'intro-robotics',
        title: 'What is a Robot?',
        description: 'Learn the basics of what makes a machine a robot.',
        icon: 'Cpu',
        color: 'text-stem-blue',
        content: `
# Welcome to Robotics! 🤖

A robot is a machine that can perform tasks automatically. Most robots have three main parts:
1. **Sensors**: These are like the robot's eyes and ears. They help it understand the world.
2. **Brain (Controller)**: This is where the robot thinks and makes decisions.
3. **Actuators**: These are the robot's muscles! They help it move or do things.

### Fun Fact
The word "robot" comes from the Czech word "robota," which means "forced labor" or "work."
        `
      },
      {
        id: 'arduino-intro',
        title: 'Meet Arduino!',
        description: 'The tiny computer that controls your robots.',
        icon: 'Zap',
        color: 'text-stem-blue',
        content: `
# Meet Arduino 🔌

Arduino is an open-source electronics platform based on easy-to-use hardware and software. It's the "brain" of many DIY robots!

### Why Arduino?
- **Easy to learn**: Great for beginners.
- **Versatile**: Can control lights, motors, and read sensors.
- **Huge Community**: Millions of people use it!

### Video: How Arduino Works
[Watch: Arduino Basics](https://www.youtube.com/embed/nL34zDTPk68)
*(Imagine a video here showing the Arduino board blinking an LED!)*
        `
      },
      {
        id: 'arduino-project-led',
        title: 'Project: Blinking LED',
        description: 'Your first Arduino project - making a light blink!',
        icon: 'Activity',
        color: 'text-stem-blue',
        content: `
# Project: Blinking LED 💡

This is the "Hello World" of electronics. We will make an LED turn on and off.

### What you need:
1. Arduino Uno
2. LED
3. 220-ohm Resistor
4. Breadboard

### The Code:
\`\`\`cpp
void setup() {
  pinMode(13, OUTPUT); // Set pin 13 as an output
}

void loop() {
  digitalWrite(13, HIGH); // Turn the LED on
  delay(1000);           // Wait for a second
  digitalWrite(13, LOW);  // Turn the LED off
  delay(1000);           // Wait for a second
}
\`\`\`

### Video Tutorial
[Watch: Blinking LED Project](https://www.youtube.com/embed/6q1y3_t6000)
        `
      },
      {
        id: 'arduino-radar',
        title: 'Project: Ultrasonic Radar',
        description: 'Build a radar that detects objects using sound!',
        icon: 'Eye',
        color: 'text-stem-blue',
        content: `
# Project: Ultrasonic Radar 📡

Learn how robots "see" using sound waves, just like bats!

### How it works:
The **HC-SR04** sensor sends out a sound wave. If it hits an object, it bounces back. By measuring the time it takes, the Arduino calculates the distance.

### The Math:
Distance = (Time × Speed of Sound) / 2

### Video Explanation
[Watch: Ultrasonic Sensor Project](https://www.youtube.com/embed/ZejQOX69K5M)
        `
      }
    ]
  },
  {
    id: 'electronics',
    name: 'Electronics Enclave',
    description: 'Master the flow of electricity and build circuits.',
    icon: 'Zap',
    color: 'bg-stem-green',
    topics: [
      {
        id: 'basic-circuits',
        title: 'The Magic of Circuits',
        description: 'Understanding how electricity flows.',
        icon: 'Activity',
        color: 'text-stem-green',
        content: `
# The Magic of Circuits ⚡

Electricity needs a complete path to flow. This path is called a **circuit**.

### The Big Three:
1. **Voltage (V)**: The "push" that makes electricity move.
2. **Current (I)**: The actual flow of electricity.
3. **Resistance (R)**: Things that slow down the flow (like a lightbulb).

**Ohm's Law**: V = I × R
        `
      },
      {
        id: 'breadboarding',
        title: 'Breadboarding 101',
        description: 'How to build circuits without soldering.',
        icon: 'Grid',
        color: 'text-stem-green',
        content: `
# Breadboarding 🍞

A breadboard is a tool used to build and test circuits quickly. No glue or solder needed!

### How it works:
- **Rails**: The long lines on the sides (usually for Power and Ground).
- **Rows**: The short lines in the middle where you plug in components.

### Video: Using a Breadboard
[Watch: Breadboard Basics](https://www.youtube.com/embed/6WBaQA_A79k)
        `
      }
    ]
  },
  {
    id: 'coding',
    name: 'Coding Corner',
    description: 'Speak the language of computers with C, C++, and Blocks!',
    icon: 'Code',
    color: 'bg-stem-purple',
    topics: [
      {
        id: 'block-coding',
        title: 'Block Coding Basics',
        description: 'Drag and drop your way to programming!',
        icon: 'Puzzle',
        color: 'text-stem-purple',
        content: `
# Block Coding 🧩

Don't want to type? Use blocks! It's like building with LEGOs.

### Common Blocks:
- **When Started**: The beginning of your program.
- **Repeat 10 times**: A loop that does something over and over.
- **If / Then**: Making decisions.

### Try this logic:
[ When Started ] -> [ Repeat Forever ] -> [ Move 10 Steps ] -> [ If on Edge, Bounce ]
        `
      },
      {
        id: 'c-variables',
        title: 'C Basics: Variables',
        description: 'Storing numbers and text in C.',
        icon: 'Box',
        color: 'text-stem-purple',
        content: `
# Variables in C 📦

In C, you must tell the computer what kind of data you are storing.

### The Main Types:
- \`int\`: Whole numbers (1, 2, 100).
- \`char\`: Single characters ('A', 'b').
- \`float\`: Numbers with decimals (3.14, 0.5).

\`\`\`c
int age = 10;
float pi = 3.14159;
char grade = 'A';
\`\`\`
        `
      },
      {
        id: 'floating-points',
        title: 'Floating Points & Precision',
        description: 'Why 0.1 + 0.2 isn\'t always 0.3!',
        icon: 'Hash',
        color: 'text-stem-purple',
        content: `
# Floating Points 🌊

Computers store decimal numbers as "floating points." 

### Why "Floating"?
Because the decimal point can "float" anywhere in the number. 

### Fun Fact:
In C, a \`float\` usually has 7 decimal places of precision, while a \`double\` has 15!

\`\`\`c
float temperature = 98.6f;
double distanceToMoon = 384400.0;
\`\`\`
        `
      }
    ]
  },
  {
    id: 'aerodynamics',
    name: 'Aero Heights',
    description: 'Discover the science of flight, air, and drones.',
    icon: 'Plane',
    color: 'bg-stem-orange',
    topics: [
      {
        id: 'four-forces',
        title: 'The 4 Forces of Flight',
        description: 'How planes stay in the air.',
        icon: 'Wind',
        color: 'text-stem-orange',
        content: `
# How do Planes Fly? ✈️

There are four forces acting on a plane:
1. **Lift**: Pushes the plane UP (created by wings).
2. **Weight**: Pulls the plane DOWN (gravity).
3. **Thrust**: Pushes the plane FORWARD (engines).
4. **Drag**: Pulls the plane BACK (air resistance).
        `
      },
      {
        id: 'paper-planes',
        title: 'Paper Plane Science',
        description: 'Why some paper planes fly further than others.',
        icon: 'Send',
        color: 'text-stem-orange',
        content: `
# Paper Plane Aerodynamics 📄

Ever wonder why a "Dart" flies fast but a "Glider" stays up longer?

- **Darts**: Have low drag and high thrust (your arm!).
- **Gliders**: Have high lift because of their wide wings.

### Video: Paper Plane Physics
[Watch: Best Paper Plane Designs](https://www.youtube.com/embed/3DBrjGuVVNI)
        `
      },
      {
        id: 'drones-quadcopters',
        title: 'How Drones Fly',
        description: 'The secret of the 4 rotors.',
        icon: 'Navigation',
        color: 'text-stem-orange',
        content: `
# Quadcopters 🚁

Drones use 4 rotors to fly. 
- To go **UP**: All 4 rotors spin faster.
- To go **LEFT**: The rotors on the right spin faster.
- To **SPIN**: Two rotors spin clockwise, and two spin counter-clockwise.

### Video: Drone Physics
[Watch: How Drones Work](https://www.youtube.com/embed/669n_r6Tf2k)
        `
      },
      {
        id: 'air-pressure',
        title: 'Air Pressure & Bernoulli',
        description: 'The invisible force that lifts planes.',
        icon: 'CloudRain',
        color: 'text-stem-orange',
        content: `
# Bernoulli's Principle 🌬️

Fast-moving air has **lower pressure** than slow-moving air. 

When air moves over a curved wing, it moves faster on top, creating low pressure. The high pressure underneath pushes the wing UP!
        `
      }
    ]
  }
];

