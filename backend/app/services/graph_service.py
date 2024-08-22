from ..models.graph_model import GraphModel

class GraphService:
    def __init__(self, driver):
        self.model = GraphModel(driver)

    def get_graph(self):
        return self.model.get_graph()

    def get_user_graph(self, codice_fiscale_assistito):
        return self.model.get_user_graph(codice_fiscale_assistito)
    
    def get_all_dates(self):
        return self.model.get_all_dates()

    def get_prescriptions_by_date(self, selected_date):
        return self.model.get_prescriptions_by_date(selected_date)

    def get_prescriptions_by_date_range(self, start_date, end_date):
        return self.model.get_prescriptions_by_date_range(start_date, end_date)