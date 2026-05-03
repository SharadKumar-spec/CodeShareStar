// Default runnable code samples for every supported language

const DEFAULT_SAMPLES = {
  javascript: `// 🚀 JavaScript — Array Magic & Functions
const students = [
  { name: "Aarav", marks: 92 },
  { name: "Priya", marks: 85 },
  { name: "Rahul", marks: 97 },
  { name: "Ananya", marks: 78 },
  { name: "Vikram", marks: 88 }
];

const toppers = students.filter(s => s.marks >= 90);
const average = students.reduce((sum, s) => sum + s.marks, 0) / students.length;

console.log("🎓 Student Results:");
console.log("─".repeat(30));
students.forEach(s => {
  const grade = s.marks >= 90 ? "A+" : s.marks >= 80 ? "A" : "B";
  console.log("  " + s.name.padEnd(10) + " | " + s.marks + " | Grade: " + grade);
});
console.log("─".repeat(30));
console.log("📊 Average: " + average.toFixed(1));
console.log("🏆 Toppers: " + toppers.map(s => s.name).join(", "));
console.log("📈 Highest: " + Math.max(...students.map(s => s.marks)));
`,

  typescript: `// 🔷 TypeScript — Interfaces & Generics
interface Product {
  name: string;
  price: number;
  category: string;
}

function filterByPrice<T extends { price: number }>(items: T[], max: number): T[] {
  return items.filter(item => item.price <= max);
}

const products: Product[] = [
  { name: "Laptop", price: 999, category: "Electronics" },
  { name: "Book", price: 15, category: "Education" },
  { name: "Phone", price: 699, category: "Electronics" },
  { name: "Pen", price: 3, category: "Stationery" },
  { name: "Tablet", price: 450, category: "Electronics" }
];

console.log("🛒 All Products:");
products.forEach(p => console.log("  " + p.name + " — $" + p.price + " [" + p.category + "]"));

const affordable = filterByPrice(products, 100);
console.log("\\n💰 Affordable (≤ $100):", affordable.map(p => p.name).join(", "));

const total = products.reduce((s, p) => s + p.price, 0);
console.log("💵 Total Value: $" + total);
`,

  python: `# 🐍 Python — Patterns & Data Processing
def fibonacci(n):
    a, b = 0, 1
    series = []
    for _ in range(n):
        series.append(a)
        a, b = b, a + b
    return series

def factorial(n):
    return 1 if n <= 1 else n * factorial(n - 1)

fib = fibonacci(10)
print("🔢 Fibonacci:", fib)
print(f"📐 Golden Ratio: {fib[-1]/fib[-2]:.6f}")

print("\\n📊 Factorials:")
for i in range(1, 8):
    print(f"  {i}! = {factorial(i)}")

print("\\n⭐ Diamond Pattern:")
for i in range(1, 6):
    print("  " + " " * (5 - i) + "★ " * i)
for i in range(4, 0, -1):
    print("  " + " " * (5 - i) + "★ " * i)

print("\\n✅ Python is working perfectly!")
`,

  java: `// ☕ Java — OOP & Collections
import java.util.*;
import java.util.stream.*;

public class Main {
    static String grade(int m) {
        if (m >= 90) return "A+";
        if (m >= 80) return "A";
        if (m >= 70) return "B";
        return "C";
    }

    public static void main(String[] args) {
        String[] names = {"Aarav", "Priya", "Rahul", "Ananya", "Vikram"};
        int[] marks = {95, 82, 91, 76, 88};

        System.out.println("🎓 Student Report Card");
        System.out.println("━".repeat(35));
        for (int i = 0; i < names.length; i++) {
            System.out.printf("  %-10s | %3d | Grade: %s%n", names[i], marks[i], grade(marks[i]));
        }
        System.out.println("━".repeat(35));

        double avg = Arrays.stream(marks).average().orElse(0);
        int max = Arrays.stream(marks).max().orElse(0);
        long toppers = Arrays.stream(marks).filter(m -> m >= 90).count();

        System.out.printf("📊 Average: %.1f%n", avg);
        System.out.printf("📈 Highest: %d%n", max);
        System.out.printf("🏆 Toppers: %d students%n", toppers);
        System.out.println("\\n✅ Java is working perfectly!");
    }
}
`,

  cpp: `// ⚡ C++ — STL & Algorithms
#include <iostream>
#include <vector>
#include <algorithm>
#include <numeric>
#include <iomanip>
using namespace std;

int main() {
    vector<string> names = {"Aarav", "Priya", "Rahul", "Ananya", "Vikram"};
    vector<int> marks = {95, 82, 91, 76, 88};

    // Create index array and sort by marks
    vector<int> idx(names.size());
    iota(idx.begin(), idx.end(), 0);
    sort(idx.begin(), idx.end(), [&](int a, int b) { return marks[a] > marks[b]; });

    cout << "🎓 Student Rankings" << endl;
    cout << string(35, '-') << endl;
    for (int r = 0; r < (int)idx.size(); r++) {
        int i = idx[r];
        string grade = marks[i] >= 90 ? "A+" : marks[i] >= 80 ? "A" : "B";
        cout << "  #" << r+1 << " " << setw(10) << left << names[i]
             << " | " << marks[i] << " | " << grade << endl;
    }
    cout << string(35, '-') << endl;

    double avg = accumulate(marks.begin(), marks.end(), 0.0) / marks.size();
    cout << fixed << setprecision(1);
    cout << "📊 Average: " << avg << endl;
    cout << "📈 Highest: " << *max_element(marks.begin(), marks.end()) << endl;
    cout << "\\n✅ C++ is working perfectly!" << endl;
    return 0;
}
`,

  csharp: `// 🟣 C# — LINQ & Modern Features
using System;
using System.Linq;

class Program {
    static string Grade(int m) => m switch {
        >= 90 => "A+", >= 80 => "A", >= 70 => "B", _ => "C"
    };

    static void Main() {
        var names = new[] { "Aarav", "Priya", "Rahul", "Ananya", "Vikram" };
        var marks = new[] { 95, 82, 91, 76, 88 };

        Console.WriteLine("🎓 Student Report");
        Console.WriteLine(new string('━', 35));
        var students = names.Zip(marks, (n, m) => new { Name = n, Marks = m })
                            .OrderByDescending(s => s.Marks);
        int rank = 1;
        foreach (var s in students) {
            Console.WriteLine($"  #{rank++} {s.Name,-10} | {s.Marks,3} | {Grade(s.Marks)}");
        }
        Console.WriteLine(new string('━', 35));
        Console.WriteLine($"📊 Average: {marks.Average():F1}");
        Console.WriteLine($"📈 Highest: {marks.Max()}");
        Console.WriteLine($"🏆 Toppers: {names.Zip(marks, (n,m)=>new{n,m}).Count(x=>x.m>=90)}");
        Console.WriteLine("\\n✅ C# is working perfectly!");
    }
}
`,

  go: `// 🐹 Go — Structs & Slices
package main

import (
    "fmt"
    "sort"
    "strings"
)

type Student struct {
    Name  string
    Marks int
}

func grade(m int) string {
    switch {
    case m >= 90: return "A+"
    case m >= 80: return "A"
    case m >= 70: return "B"
    default:      return "C"
    }
}

func main() {
    students := []Student{
        {"Aarav", 95}, {"Priya", 82}, {"Rahul", 91},
        {"Ananya", 76}, {"Vikram", 88},
    }

    sort.Slice(students, func(i, j int) bool {
        return students[i].Marks > students[j].Marks
    })

    fmt.Println("🎓 Student Rankings")
    fmt.Println(strings.Repeat("━", 35))
    total := 0
    for i, s := range students {
        fmt.Printf("  #%d %-10s | %d | %s\\n", i+1, s.Name, s.Marks, grade(s.Marks))
        total += s.Marks
    }
    fmt.Println(strings.Repeat("━", 35))
    fmt.Printf("📊 Average: %.1f\\n", float64(total)/float64(len(students)))
    fmt.Printf("🏆 Topper: %s (%d)\\n", students[0].Name, students[0].Marks)
    fmt.Println("\\n✅ Go is working perfectly!")
}
`,

  rust: `// 🦀 Rust — Structs & Iterators
struct Student { name: String, marks: u32 }

impl Student {
    fn new(name: &str, marks: u32) -> Self {
        Student { name: name.to_string(), marks }
    }
    fn grade(&self) -> &str {
        match self.marks {
            90..=100 => "A+", 80..=89 => "A",
            70..=79 => "B", _ => "C",
        }
    }
}

fn main() {
    let mut students = vec![
        Student::new("Aarav", 95),
        Student::new("Priya", 82),
        Student::new("Rahul", 91),
        Student::new("Ananya", 76),
        Student::new("Vikram", 88),
    ];

    students.sort_by(|a, b| b.marks.cmp(&a.marks));

    println!("🎓 Student Rankings");
    println!("{}", "━".repeat(35));
    for (i, s) in students.iter().enumerate() {
        println!("  #{} {:<10} | {} | {}", i+1, s.name, s.marks, s.grade());
    }
    println!("{}", "━".repeat(35));

    let total: u32 = students.iter().map(|s| s.marks).sum();
    let avg = total as f64 / students.len() as f64;
    println!("📊 Average: {:.1}", avg);
    println!("🏆 Topper: {} ({})", students[0].name, students[0].marks);
    println!("\\n✅ Rust is working perfectly!");
}
`,

  html: `<!-- 🌐 HTML — This is a markup language -->
<!-- HTML cannot be "executed" like a program -->
<!-- But here's a sample page structure! -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>CodeShare Demo</title>
</head>
<body>
    <h1>Hello, CodeShare! 🚀</h1>
    <p>This is a sample HTML page.</p>
    <ul>
        <li>HTML is for structure</li>
        <li>CSS is for styling</li>
        <li>JavaScript is for logic</li>
    </ul>
</body>
</html>
`,

  css: `/* 🎨 CSS — Styling Language */
/* CSS cannot be executed, but here's a sample! */

.card {
    background: linear-gradient(135deg, #6c63ff, #8b5cf6);
    border-radius: 16px;
    padding: 24px;
    color: white;
    box-shadow: 0 8px 32px rgba(108, 99, 255, 0.3);
    transition: transform 0.3s ease;
}

.card:hover {
    transform: translateY(-4px);
}

.btn-primary {
    background: #6c63ff;
    color: #fff;
    border: none;
    padding: 12px 24px;
    border-radius: 8px;
    cursor: pointer;
}
`,

  sql: `-- 📊 SQL — Database Query Language
-- SQL cannot be executed here, but here's a sample!

CREATE TABLE students (
    id INT PRIMARY KEY,
    name VARCHAR(50),
    marks INT,
    grade CHAR(2)
);

INSERT INTO students VALUES
(1, 'Aarav',  95, 'A+'),
(2, 'Priya',  82, 'A'),
(3, 'Rahul',  91, 'A+'),
(4, 'Ananya', 76, 'B'),
(5, 'Vikram', 88, 'A');

-- Get toppers
SELECT name, marks, grade
FROM students
WHERE marks >= 90
ORDER BY marks DESC;

-- Average marks
SELECT AVG(marks) AS average_marks FROM students;
`,

  json: `{
  "project": "CodeShare",
  "version": "1.0.0",
  "description": "Real-time collaborative code editor",
  "features": [
    "Multi-language support",
    "Live code execution",
    "Real-time sync",
    "Live chat"
  ],
  "languages": [
    "JavaScript", "TypeScript", "Python",
    "Java", "C++", "C#", "Go", "Rust"
  ],
  "author": {
    "name": "CodeShare Team",
    "status": "Active"
  }
}
`,

  markdown: `# 📝 CodeShare - Markdown Demo

## Features
- **Real-time** collaboration
- **Multi-language** support
- **Live chat** with team members
- **Code execution** with Run button

## Supported Languages
| Language   | Status  | Executable |
|------------|---------|------------|
| JavaScript | ✅ Ready | ▶ Yes     |
| Python     | ✅ Ready | ▶ Yes     |
| Java       | ✅ Ready | ▶ Yes     |
| C++        | ✅ Ready | ▶ Yes     |
| Go         | ✅ Ready | ▶ Yes     |
| Rust       | ✅ Ready | ▶ Yes     |

> **Tip:** Click the **Run** button to execute your code!
`,
}

export default DEFAULT_SAMPLES
