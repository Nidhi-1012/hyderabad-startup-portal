import re

def extract_sections():
    with open('frontend/src/pages/Home.tsx', 'r', encoding='utf-8') as f:
        content = f.read()

    # The sections start after <div className="max-w-4xl mx-auto px-6 py-12 pb-32">
    start_tag = '<div className="max-w-4xl mx-auto px-6 py-12 pb-32">'
    end_tag = '      {/* Sections have been moved to individual pages via GuideDetail */}'
    
    start_idx = content.find(start_tag)
    end_idx = content.find(end_tag)

    if start_idx == -1 or end_idx == -1:
        # If already replaced, read the generated guideSectionsJSX.tsx instead to reconstruct
        with open('frontend/src/data/guideSectionsJSX.tsx', 'r', encoding='utf-8') as f:
             old_gen = f.read()
        
        # We replace the export statement
        new_gen = old_gen.replace(
            "export const guideSections: Record<string, React.ReactNode> = {", 
            "import { Startup } from '../types';\n\nexport const getGuideSections = (startups: Startup[], isLoadingStartups: boolean, setSelectedStartup?: any): Record<string, React.ReactNode> => ({"
        )
        new_gen = new_gen.replace("};", "});")
        
        with open('frontend/src/data/guideSectionsJSX.tsx', 'w', encoding='utf-8') as f:
             f.write(new_gen)
        print("Updated guideSectionsJSX.tsx to be a function.")
        return

if __name__ == '__main__':
    extract_sections()
