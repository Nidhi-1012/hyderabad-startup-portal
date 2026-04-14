import re
import json

def parse_markdown_to_jsx(md_text):
    # Regexes for inline styles
    def replace_inline(text):
        text = re.sub(r'\*\*(.*?)\*\*', r'<strong className="font-bold text-slate-200">\1</strong>', text)
        text = re.sub(r'\*(.*?)\*', r'<em className="italic text-slate-300">\1</em>', text)
        # Handle links [text](url) -> <a href=...>text</a>
        # Need to handle inner quotes
        text = re.sub(r'\[(.*?)\]\((.*?)\)', r'<a href="\2" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline underline-offset-4 decoration-blue-500/30">\1</a>', text)
        return text

    sections = []
    lines = md_text.split('\n')
    current_section = None
    buffer = []
    in_table = False
    table_headers = []
    table_rows = []
    
    def flush_buffer():
        nonlocal buffer, current_section, in_table, table_headers, table_rows
        if not buffer: return
        
        # Are we in a list?
        if all(line.startswith('- ') or line.startswith('* ') for line in buffer):
            list_items = [line[2:] for line in buffer]
            current_section['content'].append('<ul className="space-y-3 mb-6 font-medium text-slate-400">')
            for li in list_items:
                current_section['content'].append('<li className="flex items-start gap-3"><span className="text-blue-500 mt-1.5 shadow-[0_0_10px_rgba(59,130,246,0.5)] bg-blue-500/20 p-1 rounded-full"><div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div></span><span className="flex-1">' + replace_inline(li) + '</span></li>')
            current_section['content'].append('</ul>')
        else:
            p_text = " ".join(buffer)
            if p_text.startswith('> '):
                # blockquote
                content = replace_inline(p_text.replace('> ', ''))
                current_section['content'].append(f'<div className="border-l-4 border-blue-500 pl-6 py-2 my-8 italic text-slate-300 bg-gradient-to-r from-blue-500/10 to-transparent rounded-r-2xl"><p className="leading-relaxed">{content}</p></div>')
            else:
                current_section['content'].append(f'<p className="mb-6 text-slate-400 leading-relaxed text-lg">{replace_inline(p_text)}</p>')
        
        buffer = []

    def flush_table():
        nonlocal in_table, table_headers, table_rows
        if not in_table: return
        table_html = [
            '<div className="my-8 overflow-hidden rounded-[2rem] border border-slate-800 bg-slate-900/40 backdrop-blur-sm shadow-2xl">',
            '<div className="overflow-x-auto custom-scrollbar">',
            '<table className="w-full text-left border-collapse">',
            '<thead>',
            '<tr className="border-b border-white/5 bg-slate-800/20">'
        ]
        for th in table_headers:
            table_html.append(f'<th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">{replace_inline(th)}</th>')
        table_html.append('</tr></thead><tbody className="divide-y divide-white/5">')
        
        for row in table_rows:
            table_html.append('<tr className="hover:bg-blue-500/5 transition-colors duration-150 group">')
            for cell in row:
                table_html.append(f'<td className="px-8 py-5 text-sm text-slate-300 group-hover:text-slate-100 font-medium">{replace_inline(cell)}</td>')
            table_html.append('</tr>')
            
        table_html.append('</tbody></table></div></div>')
        current_section['content'].append(''.join(table_html))
        
        in_table = False
        table_headers = []
        table_rows = []

    for line in lines:
        line = line.strip()
        if not line:
            flush_buffer()
            continue

        if line.startswith('## '):
            flush_buffer()
            flush_table()
            title = line[3:].strip()
            # mapping ID
            id_map = {
                "The Food Bible": "food-bible",
                "Nightlife & Entertainment": "nightlife",
                "Culture, Heritage & Things to Do": "culture",
                "Fitness, Outdoors & Wellness": "fitness",
                "Communities & Social Life": "communities",
                "Infrastructure & Getting Around": "infrastructure",
                "What's Coming Next: Mega Projects 2026–2032": "mega-projects",
                "Hyderabad vs. Bangalore — The Honest Comparison": "hyd-vs-blr",
                "People to Follow": "people",
                "Books, Music & Media about Hyderabad": "media",
                "Practical Essentials": "practical",
                "The Honest Downsides": "downsides",
                "Academic & Research References": "academic",
                "Month-by-Month Weather & Climate Guide": "weather",
                "Startup Registration & Legal Playbooks": "legal",
                "Hiring & Talent Landscape": "hiring",
                "Healthcare Guide": "healthcare",
                "EV & Sustainable Transport": "ev-sustainable",
                "Co-Living & PG Guide": "co-living",
                "Weekend Getaways & Day Trips": "weekend-getaways",
                "Dating & Social Scene": "dating-social",
                "Pet-Friendly Hyderabad": "pet-friendly",
                "LGBTQ+ Scene": "lgbtq-scene",
                "International Schools & Expat Guide": "international-schools",
                "Founder Networking & Communities": "founder-networking"
            }
            sec_id = id_map.get(title, title.lower().replace(' ', '-').replace('&', ''))
            current_section = {
                'id': sec_id,
                'title': title,
                'content': []
            }
            sections.append(current_section)
            continue
            
        if not current_section:
            continue
            
        if line.startswith('### '):
            flush_buffer()
            flush_table()
            current_section['content'].append(f'<h3 className="text-2xl font-black text-white mt-12 mb-6 tracking-tight flex items-center gap-3"><span className="w-8 h-1 bg-blue-500 rounded-full inline-block"></span>{replace_inline(line[4:].strip())}</h3>')
            continue
            
        if line.startswith('#### '):
            flush_buffer()
            flush_table()
            current_section['content'].append(f'<h4 className="text-xl font-bold text-slate-200 mt-8 mb-4 flex items-center gap-2"><span className="text-blue-400">▹</span>{replace_inline(line[5:].strip())}</h4>')
            continue
            
        if line.startswith('|') and '|' in line[1:]:
            flush_buffer()
            parts = [p.strip() for p in line.strip('|').split('|')]
            if all(set(p) == {'-'} for p in parts if p):
                continue # separator
            if not in_table:
                in_table = True
                table_headers = parts
            else:
                table_rows.append(parts)
            continue
            
        if in_table:
            flush_table()
            
        buffer.append(line)
        
    flush_buffer()
    flush_table()

    # Generate JSX
    jsx_blocks = []
    for sec in sections:
        jsx = f'<Section id="{sec["id"]}" title="{sec["title"]}">\n'
        for c in sec['content']:
            jsx += f'  {c}\n'
        jsx += '</Section>\n'
        jsx_blocks.append(jsx)

    return "\n".join(jsx_blocks)

if __name__ == "__main__":
    with open('scratch/content.md', 'r', encoding='utf-8') as f:
        md = f.read()
    jsx = parse_markdown_to_jsx(md)
    with open('scratch/generated_sections.txt', 'w', encoding='utf-8') as f:
        f.write(jsx)
    print("Done")
