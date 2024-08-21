from ..models.graph_model import GraphModel

class GraphService:
    def __init__(self, driver):
        self.model = GraphModel(driver)

    def get_graph(self):
        return self.model.get_graph()
