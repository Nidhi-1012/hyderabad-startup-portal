import re

def inject_home():
    with open('scratch/generated_sections.txt', 'r', encoding='utf-8') as f:
        new_content = f.read()

    with open('frontend/src/pages/Home.tsx', 'r', encoding='utf-8') as f:
        home_text = f.read()

    # Find start and end exactly based on comments and existing structure
    start_str = '        {/* 10 Food Bible */}'
    end_str = '      <AddStartupModal'
    
    start_idx = home_text.find(start_str)
    end_idx = home_text.find(end_str)
    
    if start_idx == -1 or end_idx == -1:
        print("Could not find start/end indices")
        return
        
    final_text = home_text[:start_idx] + new_content + "\n      </div>\n\n" + home_text[end_idx:]
    
    with open('frontend/src/pages/Home.tsx', 'w', encoding='utf-8') as f:
        f.write(final_text)
    
    print("Successfully updated Home.tsx")

if __name__ == "__main__":
    inject_home()
