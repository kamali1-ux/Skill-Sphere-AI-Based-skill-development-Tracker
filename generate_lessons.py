import os
import json
import random

def generate_all_lessons():
    output_dir = "frontend/lessons"
    os.makedirs(output_dir, exist_ok=True)

    skills = ["Python", "SQL", "Java", "JavaScript", "HTML", "CSS", "React", "Node.js", "Machine Learning", "Git"]
    categories = {
        "Python": "Programming",
        "SQL": "Data Science",
        "Java": "Programming",
        "JavaScript": "Programming",
        "HTML": "Design",
        "CSS": "Design",
        "React": "Programming",
        "Node.js": "Programming",
        "Machine Learning": "Data Science",
        "Git": "Leadership"
    }

    # Lists of vocabulary for placeholders
    variables = ["data", "result", "items", "users", "config", "values", "output", "buffer", "stream", "payload", "records", "nodes", "cache", "token", "session", "request", "response", "client", "server"]
    functions = ["process", "handle", "validate", "parse", "format", "load", "save", "compute", "filter", "transform", "fetch", "send", "receive", "configure", "initialize", "terminate", "render", "execute", "analyze", "optimize"]
    classes = ["UserManager", "DatabaseConnection", "ConfigLoader", "RequestHandler", "ResponseBuilder", "FileParser", "DataStreamer", "CacheManager", "SessionTracker", "TokenValidator"]
    elements = ["container", "header", "footer", "sidebar", "button", "input-field", "navigation", "modal-dialog", "dropdown-menu", "tooltip-box"]
    attributes = ["class", "id", "style", "data-id", "placeholder", "value", "href", "src", "type", "disabled"]

    templates = {
        "Python": {
            "Beginner": [
                {
                    "q": "What will be the output of `print(len({var1}))` if `{var1} = {val1}`?",
                    "options": ["{ans}", "{dist1}", "{dist2}", "{dist3}"],
                    "ans": "{ans_val}",
                    "explanation": "The len() function returns the number of items in an object. Since `{var1}` contains {ans_val} elements, len({var1}) evaluates to {ans_val}."
                },
                {
                    "q": "Which of the following methods is used to add the value `{val1}` to the end of a list named `{var1}` in Python?",
                    "options": ["{var1}.append({val1})", "{var1}.add({val1})", "{var1}.insert({val1})", "{var1}.push({val1})"],
                    "ans": "{var1}.append({val1})",
                    "explanation": "In Python, the `append()` method adds an item to the end of a list. `add()` is for sets, `insert()` requires an index, and `push()` is not a valid list method."
                },
                {
                    "q": "What is the correct syntax to create a dictionary with a key `{key1}` and value `{val1}` in Python?",
                    "options": ["{{'{key1}': {val1}}}", "[('{key1}', {val1})]", "dict('{key1}' = {val1})", "new dict('{key1}', {val1})"],
                    "ans": "{{'{key1}': {val1}}}",
                    "explanation": "Dictionaries in Python are created using curly braces with key-value pairs separated by colons, i.e., {{'key': value}}."
                }
            ],
            "Intermediate": [
                {
                    "q": "What is the output of the list comprehension `[{var1} * {num1} for {var1} in {list_val} if {var1} > {num2}]`?",
                    "options": ["{ans}", "{dist1}", "{dist2}", "{dist3}"],
                    "ans": "{ans_val}",
                    "explanation": "The list comprehension filters `{list_val}` keeping only elements greater than {num2}, then multiplies each by {num1}, yielding {ans_val}."
                },
                {
                    "q": "What is the primary difference between a list and a generator expression in Python?",
                    "options": [
                        "Generators evaluate items lazily on demand, saving memory.",
                        "Lists are immutable, whereas generators can be modified in place.",
                        "Generators support random index access, whereas lists do not.",
                        "Lists use parentheses (), whereas generators use square brackets []."
                    ],
                    "ans": "Generators evaluate items lazily on demand, saving memory.",
                    "explanation": "Generators yield items one by one using lazy evaluation, making them much more memory-efficient than lists which load all items into memory immediately."
                },
                {
                    "q": "How does the `{func}` function decorator behave in Python?",
                    "options": [
                        "It wraps the target function to modify or extend its behavior without changing its source code.",
                        "It compiles the target function into highly optimized C bytecode.",
                        "It automatically deletes the target function from memory after execution.",
                        "It converts all local variables in the function to global scope variables."
                    ],
                    "ans": "It wraps the target function to modify or extend its behavior without changing its source code.",
                    "explanation": "Decorators in Python allow wrapping a function to modify or inspect arguments, return values, or execution flow dynamically."
                }
            ],
            "Advanced": [
                {
                    "q": "Under what circumstance does the Python Global Interpreter Lock (GIL) release control to other threads?",
                    "options": [
                        "During blocking I/O operations or explicit calls to time.sleep().",
                        "Only when a thread runs for exactly 10,000 CPU instructions.",
                        "When the class `{class1}` invokes garbage collection.",
                        "Never; Python is single-threaded and cannot run other threads."
                    ],
                    "ans": "During blocking I/O operations or explicit calls to time.sleep().",
                    "explanation": "The GIL is released during I/O operations, sleeping, or when C-extensions explicitly release it, allowing other threads to execute."
                },
                {
                    "q": "What is the correct signature and behavior of the `__get__` method in Python's descriptor protocol?",
                    "options": [
                        "`def __get__(self, instance, owner)`: returns the attribute value, where `instance` is the calling object and `owner` is the class.",
                        "`def __get__(self, instance)`: returns the attribute value, where `instance` is always the global module.",
                        "`def __get__(self, owner)`: returns the attributes of class `{class1}` dynamically.",
                        "`def __get__(self, instance, class, value)`: updates the attribute dynamically."
                    ],
                    "ans": "`def __get__(self, instance, owner)`: returns the attribute value, where `instance` is the calling object and `owner` is the class.",
                    "explanation": "The descriptor protocol's `__get__` takes three arguments: self (the descriptor instance), instance (the object the descriptor was accessed from), and owner (the class of the instance)."
                }
            ]
        },
        "SQL": {
            "Beginner": [
                {
                    "q": "Which SQL statement is used to retrieve only unique values from the column `{var1}` in table `{var2}`?",
                    "options": [
                        "SELECT DISTINCT {var1} FROM {var2};",
                        "SELECT UNIQUE {var1} FROM {var2};",
                        "SELECT DIFFERENT {var1} FROM {var2};",
                        "SELECT INDIVIDUAL {var1} FROM {var2};"
                    ],
                    "ans": "SELECT DISTINCT {var1} FROM {var2};",
                    "explanation": "The DISTINCT keyword is the standard SQL syntax to filter out duplicate rows and return unique values."
                },
                {
                    "q": "What clause is used to filter query results based on conditions involving column `{var1}`?",
                    "options": [
                        "WHERE",
                        "HAVING",
                        "GROUP BY",
                        "ORDER BY"
                    ],
                    "ans": "WHERE",
                    "explanation": "The WHERE clause is used to filter rows in a query based on a specific boolean condition."
                }
            ],
            "Intermediate": [
                {
                    "q": "What is the difference between an `INNER JOIN` and a `LEFT JOIN` on tables `{var1}` and `{var2}`?",
                    "options": [
                        "`INNER JOIN` returns matching rows in both tables; `LEFT JOIN` returns all rows from `{var1}` plus matching rows from `{var2}`.",
                        "`INNER JOIN` returns all rows from both tables; `LEFT JOIN` returns only matching rows from `{var1}`.",
                        "`INNER JOIN` merges rows horizontally; `LEFT JOIN` appends them vertically.",
                        "`INNER JOIN` requires primary keys on column `{var1}`; `LEFT JOIN` does not require keys."
                    ],
                    "ans": "`INNER JOIN` returns matching rows in both tables; `LEFT JOIN` returns all rows from `{var1}` plus matching rows from `{var2}`.",
                    "explanation": "INNER JOIN filters out non-matching rows, while LEFT JOIN preserves all rows from the left table, padding matching columns from the right table with NULL where no match exists."
                },
                {
                    "q": "Which aggregate function should you use to find the average value of the column `{var1}` in table `{var2}`?",
                    "options": [
                        "AVG({var1})",
                        "AVERAGE({var1})",
                        "MEAN({var1})",
                        "SUM({var1}) / COUNT(*)"
                    ],
                    "ans": "AVG({var1})",
                    "explanation": "AVG() is the standard SQL aggregate function for calculating the average of numeric column values."
                }
            ],
            "Advanced": [
                {
                    "q": "How does the SQL window function `ROW_NUMBER() OVER (PARTITION BY {var1} ORDER BY {var2})` behave?",
                    "options": [
                        "It assigns a unique sequential integer to rows within each partition of `{var1}`, ordered by `{var2}`.",
                        "It counts the total rows grouped by column `{var1}`.",
                        "It ranks rows but leaves gaps in sequential numbering if duplicate values exist in column `{var2}`.",
                        "It sorts the physical rows in table `{var1}` using a clustered index."
                    ],
                    "ans": "It assigns a unique sequential integer to rows within each partition of `{var1}`, ordered by `{var2}`.",
                    "explanation": "ROW_NUMBER() assigns a unique number starting at 1 for each row in a partition, resetting the count when the partition column changes."
                }
            ]
        },
        "Java": {
            "Beginner": [
                {
                    "q": "What is the primary difference between a primitive type like `int` and a wrapper class like `Integer` in Java?",
                    "options": [
                        "`int` is a primitive value stored on the stack; `Integer` is an object reference stored on the heap.",
                        "`int` can store decimal values, whereas `Integer` only stores integers.",
                        "`Integer` executes faster and takes less memory than primitive `int`.",
                        "`int` can be null, whereas `Integer` must always have a numeric value."
                    ],
                    "ans": "`int` is a primitive value stored on the stack; `Integer` is an object reference stored on the heap.",
                    "explanation": "Primitive types are basic data values, while wrapper classes are full objects, which allow inclusion in Java Generics and collections like ArrayList."
                }
            ],
            "Intermediate": [
                {
                    "q": "How does method overriding differ from method overloading in class `{class1}`?",
                    "options": [
                        "Overriding defines a subclass method with the same signature; overloading defines methods in the same class with different parameters.",
                        "Overloading uses the `@Override` annotation, while overriding is resolved at compile time.",
                        "Overriding is static polymorphism; overloading is dynamic runtime polymorphism.",
                        "Overloading changes class inheritance; overriding modifies local parameters."
                    ],
                    "ans": "Overriding defines a subclass method with the same signature; overloading defines methods in the same class with different parameters.",
                    "explanation": "Overriding allows subclasses to provide custom implementations of parent methods. Overloading allows multiple methods in a class to share a name but differ in signatures."
                }
            ],
            "Advanced": [
                {
                    "q": "What is the concept of Type Erasure in Java Generics?",
                    "options": [
                        "The compiler removes type parameters at compile-time and replaces them with raw types or Object bounds.",
                        "The JVM deletes object structures from memory during garbage collection to optimize space.",
                        "Java runtime casts all objects in class `{class1}` to primitive arrays.",
                        "It is the process of deleting unreferenced variables from heap memory."
                    ],
                    "ans": "The compiler removes type parameters at compile-time and replaces them with raw types or Object bounds.",
                    "explanation": "Type erasure ensures backwards compatibility with older Java versions by removing generic type information during compilation, so the bytecode only uses standard classes/objects."
                }
            ]
        },
        "JavaScript": {
            "Beginner": [
                {
                    "q": "What will `typeof []` evaluate to in JavaScript?",
                    "options": ["'object'", "'array'", "'list'", "'undefined'"],
                    "ans": "'object'",
                    "explanation": "In JavaScript, arrays are technically special objects, so the `typeof` operator returns `'object'`. To check if a variable is an array, you should use `Array.isArray()`."
                }
            ],
            "Intermediate": [
                {
                    "q": "What is a closure in JavaScript?",
                    "options": [
                        "A function that retains access to its lexical scope variables even when executed outside that scope.",
                        "The process of terminating a thread or resolving a Promise.",
                        "A private block of code enclosed within curly braces that cannot access global variables.",
                        "A special class decorator used to lock method definitions in class `{class1}`."
                    ],
                    "ans": "A function that retains access to its lexical scope variables even when executed outside that scope.",
                    "explanation": "Closures allow nested inner functions to 'remember' and access outer variables even after the outer function has finished executing."
                }
            ],
            "Advanced": [
                {
                    "q": "How does the JavaScript event loop prioritize microtasks vs macrotasks?",
                    "options": [
                        "All microtasks in the queue are executed immediately after the current script stack clears, before any macrotasks are processed.",
                        "Macrotasks are prioritized, and microtasks are only processed if the CPU usage falls below 10%.",
                        "The event loop executes one macrotask, then executes one microtask, switching back and forth.",
                        "Microtasks are handled by background web worker threads and run parallel to macrotasks."
                    ],
                    "ans": "All microtasks in the queue are executed immediately after the current script stack clears, before any macrotasks are processed.",
                    "explanation": "Microtasks (such as Promise callbacks) have higher priority. The microtask queue is completely drained at the end of each execution tick before taking the next macrotask (like setTimeout)."
                }
            ]
        },
        "HTML": {
            "Beginner": [
                {
                    "q": "Which HTML element is correct for displaying the main heading of a section?",
                    "options": ["<h1>", "<heading>", "<head>", "<header>"],
                    "ans": "<h1>",
                    "explanation": "<h1> is the standard semantic HTML element for the highest-level heading on a page. `<head>` is for metadata, and `<header>` is a section container."
                }
            ],
            "Intermediate": [
                {
                    "q": "What is the primary benefit of using semantic HTML5 elements like `<article>` and `<section>`?",
                    "options": [
                        "They improve SEO indexing and screen-reader accessibility by describing page structure semantically.",
                        "They speed up browser rendering by bypassing normal CSS layouts.",
                        "They automatically add border styling and padding on element `{element1}`.",
                        "They encrypt form data before submitting it to the backend api."
                    ],
                    "ans": "They improve SEO indexing and screen-reader accessibility by describing page structure semantically.",
                    "explanation": "Semantic tags tell search engines and accessibility tools what kind of content is inside, enhancing access and ranking."
                }
            ],
            "Advanced": [
                {
                    "q": "What is the purpose of ARIA landmark roles in advanced web accessibility?",
                    "options": [
                        "They define logical regions of a page (e.g., banner, main, navigation) so screen readers can jump directly to them.",
                        "They validate form entries using native browser validation scripts.",
                        "They accelerate shadow DOM rendering for custom component `{element1}`.",
                        "They map touch gestures to keyboard shortcuts in mobile web apps."
                    ],
                    "ans": "They define logical regions of a page (e.g., banner, main, navigation) so screen readers can jump directly to them.",
                    "explanation": "ARIA landmarks allow screen reader users to understand layout structure and navigate web pages quickly by bypassing repetitive headers."
                }
            ]
        },
        "CSS": {
            "Beginner": [
                {
                    "q": "Which CSS property is used to change the background color of element `{element1}`?",
                    "options": ["background-color", "color", "bgcolor", "background-fill"],
                    "ans": "background-color",
                    "explanation": "The background-color property sets the background color of an element. The color property sets text color."
                }
            ],
            "Intermediate": [
                {
                    "q": "What is the main layout difference between CSS Flexbox and CSS Grid?",
                    "options": [
                        "Flexbox is designed for one-dimensional layouts (row or column); Grid is designed for two-dimensional layouts (rows and columns simultaneously).",
                        "Flexbox only operates on width; Grid only operates on height.",
                        "Grid requires javascript to calculate alignment, whereas Flexbox runs natively.",
                        "Flexbox is only supported on mobile devices; Grid is supported on desktop."
                    ],
                    "ans": "Flexbox is designed for one-dimensional layouts (row or column); Grid is designed for two-dimensional layouts (rows and columns simultaneously).",
                    "explanation": "Flexbox distributes space along a single axis. Grid is container-based and handles alignment along rows and columns at once."
                }
            ],
            "Advanced": [
                {
                    "q": "What does the `will-change` CSS property do, and when should it be used?",
                    "options": [
                        "It hints to the browser's rendering engine that an element will animate, letting it pre-render layer composites, but should be used sparingly.",
                        "It forces immediate layout re-calculations on all class `{class1}` instances.",
                        "It prevents CSS inheritance from parent layout containers.",
                        "It allows developers to write media queries inside styles dynamically."
                    ],
                    "ans": "It hints to the browser's rendering engine that an element will animate, letting it pre-render layer composites, but should be used sparingly.",
                    "explanation": "`will-change` sets up GPU acceleration layers before changes occur. Overusing it can consume too much memory and degrade performance."
                }
            ]
        },
        "React": {
            "Beginner": [
                {
                    "q": "What is JSX in React?",
                    "options": [
                        "A syntax extension to JavaScript that allows writing HTML-like structure directly inside React files.",
                        "A custom compilers used to minify javascript outputs.",
                        "An asynchronous state manager built into class `{class1}`.",
                        "A special security layer to block cross-site scripting."
                    ],
                    "ans": "A syntax extension to JavaScript that allows writing HTML-like structure directly inside React files.",
                    "explanation": "JSX is transpiled by tools like Babel into standard React.createElement calls, providing an intuitive syntax for templates."
                }
            ],
            "Intermediate": [
                {
                    "q": "What is the primary rule of using React Hooks like `useState` or `useEffect`?",
                    "options": [
                        "Hooks must only be called at the top level of functional components, not inside loops or conditional blocks.",
                        "Hooks must be initialized inside the class `{class1}` constructor.",
                        "Hooks can only be called from vanilla javascript utility scripts.",
                        "Every Hook must include a callback method to prevent memory leaks."
                    ],
                    "ans": "Hooks must only be called at the top level of functional components, not inside loops or conditional blocks.",
                    "explanation": "React relies on the order of Hook calls to preserve state correct between renders. Calling hooks conditionally disrupts this ordering."
                }
            ],
            "Advanced": [
                {
                    "q": "How does React's Fiber architecture enable Concurrent Rendering?",
                    "options": [
                        "By splitting rendering work into incremental chunks that can be paused, resumed, or aborted based on priority.",
                        "By spawning background thread workers on the client browser.",
                        "By compiling React JSX code directly to WebAssembly binary blocks.",
                        "By bypassing the browser DOM entirely and rendering directly on a 2D canvas."
                    ],
                    "ans": "By splitting rendering work into incremental chunks that can be paused, resumed, or aborted based on priority.",
                    "explanation": "Fiber structures work as cooperative units of computation, allowing React to interrupt high-cost renders to process user interactions immediately."
                }
            ]
        },
        "Node.js": {
            "Beginner": [
                {
                    "q": "Which built-in Node.js module is used to work with files on the filesystem?",
                    "options": ["fs", "path", "http", "os"],
                    "ans": "fs",
                    "explanation": "The 'fs' (file system) module provides APIs to read, write, update, delete, and monitor files."
                }
            ],
            "Intermediate": [
                {
                    "q": "What is the purpose of Node.js streams?",
                    "options": [
                        "To process large volumes of data incrementally in chunks, avoiding high memory overhead.",
                        "To establish real-time socket connections with multiple server threads.",
                        "To automatically parse HTML element classes dynamically.",
                        "To compress static JS files in the project folder."
                    ],
                    "ans": "To process large volumes of data incrementally in chunks, avoiding high memory overhead.",
                    "explanation": "Streams read or write data piece-by-piece. This prevents holding entire large files in RAM, making the server highly memory-efficient."
                }
            ],
            "Advanced": [
                {
                    "q": "How does the Node.js event loop leverage the libuv thread pool for asynchronous tasks?",
                    "options": [
                        "Libuv offloads complex operations (like file system, cryptography, and DNS lookups) to background threads, returning results to the main loop.",
                        "The libuv thread pool executes all JavaScript execution in parallel across 4 cores.",
                        "It converts all incoming HTTP requests to background class `{class1}` instances.",
                        "It suspends the main event loop thread when database connections exceed 100."
                    ],
                    "ans": "Libuv offloads complex operations (like file system, cryptography, and DNS lookups) to background threads, returning results to the main loop.",
                    "explanation": "JavaScript is single-threaded, but libuv manages a pool of threads to run slow, blocking OS tasks asynchronously so the main thread stays responsive."
                }
            ]
        },
        "Machine Learning": {
            "Beginner": [
                {
                    "q": "What is the difference between supervised and unsupervised learning?",
                    "options": [
                        "Supervised learning trains models on labeled data; unsupervised learning works with unlabeled data to find hidden patterns.",
                        "Supervised learning is faster because it runs on GPU hardware.",
                        "Unsupervised learning requires manual classification of variables by database admins.",
                        "Supervised learning only supports linear algorithms, while unsupervised does not."
                    ],
                    "ans": "Supervised learning trains models on labeled data; unsupervised learning works with unlabeled data to find hidden patterns.",
                    "explanation": "Supervised learning maps inputs to target outputs. Unsupervised learning groups data by feature similarity without predefined labels."
                }
            ],
            "Intermediate": [
                {
                    "q": "What is overfitting in a Machine Learning model, and how can it be detected?",
                    "options": [
                        "The model performs exceptionally well on training data but poorly on unseen test data; detected by comparing training vs validation metrics.",
                        "The model is too simple to capture the underlying dataset structure.",
                        "When model training is run on an excessively large GPU cluster, exceeding memory thresholds.",
                        "When the model output predictions are completely randomized between categories."
                    ],
                    "ans": "The model performs exceptionally well on training data but poorly on unseen test data; detected by comparing training vs validation metrics.",
                    "explanation": "Overfitting happens when a model learns the training noise. It is detected when training loss decreases but validation/test loss increases."
                }
            ],
            "Advanced": [
                {
                    "q": "What is the purpose of the self-attention mechanism in Transformer architectures?",
                    "options": [
                        "It allows the model to dynamically weigh the relevance of different tokens in a sequence relative to one another, regardless of distance.",
                        "It locks the weight parameters of the neural network during backward propagation.",
                        "It automatically prunes low-importance input variables from the dataset.",
                        "It computes accuracy metrics using a parallel clustered matrix."
                    ],
                    "ans": "It allows the model to dynamically weigh the relevance of different tokens in a sequence relative to one another, regardless of distance.",
                    "explanation": "Self-attention evaluates the relationship of all words in a sentence at once. This solves long-range dependency limitations in traditional architectures like RNNs."
                }
            ]
        },
        "Git": {
            "Beginner": [
                {
                    "q": "What is the purpose of the `git init` command?",
                    "options": [
                        "To create a new local Git repository in the current folder.",
                        "To download a remote project from GitHub.",
                        "To stage all local file changes for commit.",
                        "To merge branches in the local repository."
                    ],
                    "ans": "To create a new local Git repository in the current folder.",
                    "explanation": "git init creates a hidden `.git` folder containing metadata, initializing version tracking in that directory."
                }
            ],
            "Intermediate": [
                {
                    "q": "How does `git merge` differ from `git rebase`?",
                    "options": [
                        "Merge combines branches leaving a complete history with merge commits; rebase moves the branch start point, rewriting commit history linearly.",
                        "Merge only copies new files; rebase deletes the target branch.",
                        "Rebase requires connecting to a remote server, while merge runs offline.",
                        "Merge only modifies metadata; rebase changes physical files in the folder."
                    ],
                    "ans": "Merge combines branches leaving a complete history with merge commits; rebase moves the branch start point, rewriting commit history linearly.",
                    "explanation": "Merge preserves exact historical commit sequences. Rebase rewrites history by placing local commits on top of the target branch commits, creating a clean linear timeline."
                }
            ],
            "Advanced": [
                {
                    "q": "What is the purpose of the `git reflog` command in version control?",
                    "options": [
                        "It logs the history of all local HEAD reference changes, allowing recovery of deleted commits or aborted rebases.",
                        "It displays the server pull logs from remote repository repositories.",
                        "It lists all untracked files in class folders.",
                        "It pushes local ref states to the main server branch."
                    ],
                    "ans": "It logs the history of all local HEAD reference changes, allowing recovery of deleted commits or aborted rebases.",
                    "explanation": "Git reflog tracks local checkouts, commits, rebases, and merges. Since git holds deleted commits in garbage collection for a period, reflog lets you retrieve their hashes."
                }
            ]
        }
    }

    # Generate 20,000 lessons
    # partition: 10 skills, 2000 lessons per skill
    # inside each skill:
    # 1 to 700: Beginner
    # 701 to 1400: Intermediate
    # 1401 to 2000: Advanced
    total_generated = 0
    
    for skill_idx, skill in enumerate(skills):
        skill_templates = templates.get(skill, {})
        category = categories[skill]
        
        for index_within_skill in range(1, 2001):
            lesson_id = skill_idx * 2000 + index_within_skill
            
            # Determine difficulty
            if index_within_skill <= 700:
                difficulty = "Beginner"
            elif index_within_skill <= 1400:
                difficulty = "Intermediate"
            else:
                difficulty = "Advanced"
                
            # Get templates for this difficulty
            diff_templates = skill_templates.get(difficulty, [])
            if not diff_templates:
                # Fallback to beginner if templates missing
                diff_templates = skill_templates.get("Beginner", [])
                
            # Seed random deterministically for this lesson ID
            random.seed(lesson_id)
            
            # Select and format template
            tpl = random.choice(diff_templates)
            
            # Placeholders selection
            v1 = random.choice(variables)
            v2 = random.choice(variables)
            while v2 == v1:
                v2 = random.choice(variables)
            
            f = random.choice(functions)
            c1 = random.choice(classes)
            el = random.choice(elements)
            attr = random.choice(attributes)
            
            num1 = random.randint(2, 9)
            num2 = random.randint(10, 20)
            
            # Custom formatting depending on placeholders needed
            q_text = tpl["q"]
            
            # Fill placeholders in question
            # Python list slice / list comp details
            if skill == "Python":
                val1_choice = str(random.randint(1, 100))
                val2_choice = str(random.randint(101, 200))
                key1_choice = "module_key_" + str(lesson_id)
                list_val = str([random.randint(1, 25) for _ in range(5)])
                ans_val = "[]"
                # Calculate correct answer for python lists
                try:
                    vals = eval(list_val)
                    filtered = [x * num1 for x in vals if x > num2]
                    ans_val = str(filtered)
                except Exception:
                    pass
                
                # len calculation
                list_len_val = str([random.randint(1, 10) for _ in range(random.randint(2, 6))])
                len_ans = str(len(eval(list_len_val)))
                
                q_text = q_text.format(var1=v1, var2=v2, val1=val1_choice, val2=val2_choice, 
                                      key1=key1_choice, list_val=list_val, num1=num1, num2=num2, 
                                      func=f, class1=c1)
                
                # Shuffling options
                opts = []
                for o in tpl["options"]:
                    formatted_o = o.format(var1=v1, var2=v2, val1=val1_choice, val2=val2_choice,
                                           key1=key1_choice, class1=c1, element1=el, attribute1=attr,
                                           ans=tpl["ans"], dist1="None of the options", 
                                           dist2=f"{v1}.remove({val1_choice})", dist3=f"{v1}.clear()",
                                           ans_val=ans_val, dist_val="[]")
                    # Replace custom options for first question template (len)
                    if "len(" in q_text:
                        if o == "{ans}":
                            formatted_o = len_ans
                        elif o == "{dist1}":
                            formatted_o = str(int(len_ans) + 1)
                        elif o == "{dist2}":
                            formatted_o = str(int(len_ans) - 1)
                        elif o == "{dist3}":
                            formatted_o = "0"
                    # Replace list comprehension answer
                    elif "list comprehension" in q_text:
                        if o == "{ans}":
                            formatted_o = ans_val
                        elif o == "{dist1}":
                            formatted_o = "[]"
                        elif o == "{dist2}":
                            formatted_o = str([x * 2 for x in eval(list_val)])
                        elif o == "{dist3}":
                            formatted_o = "SyntaxError"
                            
                    opts.append(formatted_o)
                    
                correct_ans = opts[0] # The template's first option is the correct one before shuffle
                
            else:
                # Format general questions
                q_text = q_text.format(var1=v1, var2=v2, class1=c1, element1=el, attribute1=attr)
                opts = []
                for o in tpl["options"]:
                    opts.append(o.format(var1=v1, var2=v2, class1=c1, element1=el, attribute1=attr))
                correct_ans = opts[0]

            # Deterministic Shuffle options
            # To ensure different answer options, shuffle them
            shuffled_indices = list(range(len(opts)))
            random.shuffle(shuffled_indices)
            shuffled_opts = [opts[i] for i in shuffled_indices]
            
            # Format explanation
            if skill == "Python":
                try:
                    exp = tpl["explanation"].format(var1=v1, val1=val1_choice, key1=key1_choice, 
                                                    ans_val=ans_val if "list comprehension" in q_text else len_ans)
                except Exception:
                    exp = tpl["explanation"]
            else:
                exp = tpl["explanation"].format(var1=v1, var2=v2, class1=c1, element1=el)

            lesson_data = {
                "id": lesson_id,
                "title": f"{skill} {difficulty} Concepts - Module #{lesson_id}",
                "category": category,
                "difficulty": difficulty,
                "question": q_text,
                "options": shuffled_opts,
                "answer": correct_ans,
                "explanation": exp
            }
            
            # Write file
            file_path = os.path.join(output_dir, f"lesson_{lesson_id}.json")
            with open(file_path, "w") as f_out:
                json.dump(lesson_data, f_out, indent=2)
                
            total_generated += 1

    print(f"Successfully generated {total_generated} unique lesson files!")

if __name__ == "__main__":
    generate_all_lessons()
