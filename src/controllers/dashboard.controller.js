const dashboardController = {
    index: (req, res) => {
        try {
            res.render('admin/pages/index.ejs', {
                layout: 'admin/layouts/default.ejs'
            })
        } catch (error) {
            res.json({ ...error })
        }
    },

}
export default dashboardController;