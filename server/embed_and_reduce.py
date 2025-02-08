import numpy as np
from sentence_transformers import SentenceTransformer
from sklearn.decomposition import PCA

def get_embedding(sentences: list):
    model = SentenceTransformer('all-MiniLM-L6-v2')
    embeddings = model.encode(sentences)
    mean_embedding = np.mean(embeddings, axis=0)
    return mean_embedding

def reduce_dimensions(embeddings, dim=3):
    pca = PCA(n_components=dim)
    reduced_embedding = pca.fit_transform(embeddings)
    return reduced_embedding
