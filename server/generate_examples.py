from embed_and_reduce import get_embedding
from db import save_document

def generate_and_save(first_name, last_name, sentences: list):
    embedding = get_embedding(sentences)
    data_dict = {
        "first_name": first_name,
        "last_name": last_name,
        "embedding": embedding.tolist(),
    }
    save_document(data_dict)

def main():
    # Example format:
    # generate_and_save("John", "Doe", ["I like dogs", "I like cats"])
    # generate_and_save("Amy", "Salazar", ["Sheesh bro that's crazy", "Let's go golfing!"])
    generate_and_save("Holy", "Cow", ["I'm a software engineer with a passion for machine learning.", "I enjoy playing tennis in my free time.", "I'm a member of the local photography club."])
    generate_and_save("Alice", "Smith", ["I'm a biology researcher specializing in genetics.", "I love hiking and exploring the great outdoors.", "I volunteer at the animal shelter on weekends."])
    generate_and_save("Michael", "Johnson", ["I'm a high school teacher, and I'm passionate about education.", "I'm a die-hard soccer fan and support my local team.", "I'm a guitarist in a local band that plays classic rock covers."])
    generate_and_save("Emma", "Davis", ["I'm a marketing professional with a focus on digital marketing.", "I enjoy playing chess and have competed in local tournaments.", "I'm an avid reader and run a book club."])
    generate_and_save("Daniel", "Wilson", ["I'm a medical doctor and I specialize in cardiology.", "I love playing basketball in my free time.", "I'm an amateur chef and enjoy experimenting with new recipes."])
    generate_and_save("Sophia", "Lee", ["I'm a computer science student with a passion for AI research.", "I'm a member of the university debate club.", "I enjoy hiking and have climbed several mountains."])
    generate_and_save("William", "Brown", ["I work in finance and have a knack for stock trading.", "I'm a collector of rare vintage coins.", "I'm an astronomy enthusiast and own a telescope."])
    generate_and_save("Olivia", "Johnson", ["I'm a pediatric nurse and find joy in helping children.", "I'm a member of a local theater group.", "I'm a certified scuba diver and explore coral reefs."])
    generate_and_save("James", "Miller", ["I'm a graphic designer with a passion for digital art.", "I'm a competitive swimmer and have won several medals.", "I'm a guitarist in a local rock band."])
    generate_and_save("Ella", "Anderson", ["I'm a student majoring in environmental science.",   "I volunteer at the local animal shelter.", "I love painting landscapes in my free time."])
    generate_and_save("Henry", "Garcia", ["I'm a software developer working on cutting-edge AI projects.", "I'm a member of the local astronomy club.", "I enjoy playing chess and have a chess rating of 2000+."])
    generate_and_save("Ava", "Martinez", ["I'm a veterinarian and I adore all animals.", "I'm a competitive equestrian and have won horse jumping competitions.", "I'm a certified scuba diver and have explored shipwrecks."])
    generate_and_save("Liam", "Clark", ["I'm a physicist working on quantum computing research.", "I play the piano and often perform at local events.", "I'm a published author of science fiction novels."])
    generate_and_save("Mia", "Thompson", ["I'm a journalist covering international politics.", "I'm a member of a local hiking group and lead nature excursions.", "I'm a coffee enthusiast and run a popular coffee blog."])
    generate_and_save("Noah", "Wright", ["I'm a civil engineer and I design sustainable infrastructure.", "I'm a dedicated rock climber and have scaled challenging peaks.", "I'm a foodie and love exploring exotic cuisines."])
    generate_and_save("Sophia", "Perez", ["I'm a marine biologist studying coral reef ecosystems.", "I'm a classical violinist and perform in orchestras.", "I'm a passionate environmental activist."])
    generate_and_save("Logan", "Hernandez", ["I'm a data scientist specializing in natural language processing.", "I'm a martial arts black belt and teach self-defense classes.", "I'm an avid traveler and have visited over 30 countries."])
    generate_and_save("Chloe", "Scott", ["I'm a psychologist helping people lead fulfilling lives.", "I'm a nature photographer and my work has been exhibited.", "I'm a vegan chef and run a plant-based cooking channel."])
    generate_and_save("Ethan", "Adams", ["I'm a pharmacist, ensuring medication safety.", "I'm a competitive swimmer, winning regional competitions.", "I'm a sci-fi book author, creating captivating stories."])
    generate_and_save("Aria", "Turner", ["I'm a software engineer, working on cutting-edge tech projects.", "I'm a dancer, specializing in contemporary dance forms.", "I'm a digital artist, creating unique artworks."])
    generate_and_save("Mason", "Gonzalez", ["I'm a financial advisor, helping clients plan for their futures.", "I'm an amateur astronomer, exploring the cosmos with my telescope.", "I'm a board game enthusiast, hosting game nights."])
    generate_and_save("Lily", "Carter", ["I'm an English teacher, inspiring students to love literature.", "I'm a volunteer at the local animal shelter, caring for rescued pets.", "I'm a scuba diver, exploring underwater caves and wrecks."])
    generate_and_save("Lucas", "Torres", ["I'm a physicist, conducting research in quantum physics.", "I'm a guitarist in a rock band, performing at local venues.", "I'm a travel vlogger, documenting my adventures."])
    generate_and_save("Zoe", "Reyes", ["I'm an architect, designing sustainable and beautiful buildings.", "I'm a competitive cyclist, participating in long-distance races.", "I'm a wildlife photographer, capturing rare animal moments."])
    generate_and_save("Elijah", "Morgan", ["I'm a geologist, studying earth's processes.", "I'm a rock climber, scaling challenging peaks.", "I'm a published poet, sharing my love for words."])

    generate_and_save("Scarlett", "Ramirez", ["I'm a lawyer, specializing in environmental law.", "I'm a salsa dancer, performing at local dance festivals.", "I'm a food critic, reviewing gourmet restaurants."])

    generate_and_save("Carter", "Cooper", ["I'm a civil engineer, designing bridges and infrastructure.", "I'm a competitive chess player, participating in national tournaments.", "I'm a science fiction enthusiast and write short stories."])

    generate_and_save("Grace", "Murphy", ["I'm a psychologist, helping individuals overcome trauma.", "I'm a nature enthusiast, exploring national parks.", "I'm a vegan chef, creating plant-based culinary delights."])

    generate_and_save("Jackson", "Rodriguez", ["I'm a pharmacist, ensuring medication safety.", "I'm a competitive cyclist, participating in long-distance races.", "I'm a sci-fi novelist, weaving futuristic tales."])

    generate_and_save("Aurora", "Bailey", ["I'm a software developer, coding innovative applications.", "I'm a ballerina, performing with a renowned dance company.", "I'm a digital artist, creating vibrant artworks."])

    generate_and_save("Mason", "Green", ["I'm a financial analyst, helping clients plan for retirement.", "I'm an amateur astronomer, observing celestial wonders.", "I'm a board game aficionado, hosting game nights."])

    generate_and_save("Lily", "Evans", ["I'm a literature professor, inspiring students with classic works.", "I'm a volunteer at the local animal shelter, caring for rescued animals.", "I'm a scuba diver, exploring underwater caves."])

    generate_and_save("Lucas", "Harris", ["I'm a physicist, conducting research in quantum mechanics.", "I'm a jazz pianist, performing at local jazz clubs.", "I'm a travel blogger, documenting my global adventures."])

    generate_and_save("Zoe", "Parker", ["I'm an architect, designing eco-friendly structures.", "I'm a competitive surfer, riding the waves of coastal beaches.", "I'm a wildlife photographer, capturing rare animal moments."])
    generate_and_save("Ethan", "Anderson", ["I'm a marine biologist, studying coral reef ecosystems.", "I'm a classical violinist, performing in orchestras.", "I'm an advocate for marine conservation."])

    generate_and_save("Ava", "White", ["I'm a software engineer, working on AI-powered applications.", "I'm a competitive rock climber, tackling challenging routes.", "I'm a food blogger, exploring culinary delights."])

    generate_and_save("Mia", "Martin", ["I'm a pediatrician, dedicated to children's health.", "I'm a member of the local theater group, acting in community plays.", "I'm a scuba diving enthusiast, exploring shipwrecks."])

    generate_and_save("Liam", "Gonzalez", ["I'm a data scientist, analyzing big data to drive business insights.", "I'm a martial arts black belt, teaching self-defense classes.", "I'm a globetrotter, having visited over 30 countries."])

    generate_and_save("Chloe", "Davis", ["I'm a psychologist, helping people overcome mental health challenges.", "I'm a nature photographer, capturing stunning landscapes.", "I'm a vegan chef, promoting plant-based cuisine."])

    generate_and_save("Ella", "Wilson", ["I'm an architect, designing sustainable and innovative buildings.", "I'm an avid hiker, exploring trails in national parks.", "I'm a wildlife photographer, documenting the beauty of nature."])

    generate_and_save("Oliver", "Perez", ["I'm a physicist, conducting groundbreaking research in quantum physics.", "I'm a talented guitarist, performing with a local jazz band.", "I'm a science fiction author, creating captivating worlds."])

    generate_and_save("Sophia", "Brown", ["I'm a marketing professional, spearheading digital marketing campaigns.", "I'm a competitive swimmer, winning regional championships.", "I'm a coffee connoisseur, running a coffee tasting blog."])

    generate_and_save("Noah", "Taylor", ["I'm a high school teacher, inspiring the next generation of leaders.", "I'm a member of a local astronomy club, exploring the night sky.", "I'm an enthusiast of board games and host game nights."])

    generate_and_save("Emma", "Clark", ["I'm a biologist, researching endangered species conservation.", "I'm a passionate dancer, performing contemporary and ballet.", "I'm a travel blogger, sharing my global adventures."])



# ... Repeat the pattern for 96 more function calls ...


if __name__ == "__main__":
    main()