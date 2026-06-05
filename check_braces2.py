from pathlib import Path
path=Path(r'c:/Users/Rajeshree Kopulwar/boxing-avenue/src/components/BookingForm.module.css')
text=path.read_text(encoding='utf-8')
stack=[]
for i,ch in enumerate(text,1):
    if ch=='{':
        stack.append(i)
    elif ch=='}':
        if stack:
            stack.pop()
for pos in stack:
    line=text[:pos].count('\n')+1
    print('OPEN', pos, 'LINE', line)
