from pathlib import Path
path=Path(r'c:/Users/Rajeshree Kopulwar/boxing-avenue/src/components/BookingForm.module.css')
text=path.read_text(encoding='utf-8')
stack=[]
unmatched=[]
for i,ch in enumerate(text,1):
    if ch=='{':
        stack.append(i)
    elif ch=='}':
        if stack:
            stack.pop()
        else:
            unmatched.append(i)
print('UNMATCHED', unmatched)
print('REMAIN', len(stack), stack[-5:])
