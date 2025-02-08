from db import get_all_submissions
import numpy as np

def get_names():
    submissions = get_all_submissions()
    for s in submissions:
        print(f"{s['first_name']} {s['last_name']}")

def get_name_to_embedding_dict():
    submissions = get_all_submissions()
    nte = {}
    for s in submissions:
        first_name = s['first_name'].lower()
        last_name = s['last_name'].lower()
        nte[f"{first_name}-{last_name}"] = np.array(s['embedding'])
    return nte

def get_sorted_matches(name):
    nte = get_name_to_embedding_dict()
    similarities = {}

    embd = nte[name]
    nte.pop(name)
    for name, embedding in nte.items():
        similarities[name] = np.dot(embd, embedding)

    similarities = sorted(similarities.items(), key=lambda x:x[1], reverse=True)
    return similarities

if __name__ == '__main__':
    similarities = get_sorted_matches("example")
    for pair in similarities:
        print(pair)