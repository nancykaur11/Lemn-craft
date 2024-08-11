const express = require('express');
const {
    createAsset,
    getAssetById,
    updateAsset,
    listAssetOnMarketplace,
    getUserAssets,
    requestToBuyAsset,
    getAssetsOnMarketplace
} = require('../controllers/assetController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', protect, createAsset);
router.get('/:id', protect, getAssetById);
router.put('/:id', protect, updateAsset);
router.put('/:id/publish', protect, listAssetOnMarketplace);
router.get('/user/assets', protect, getUserAssets);
router.post('/:id/request', protect, requestToBuyAsset);
router.get('/marketplace/assets', protect, getAssetsOnMarketplace);

module.exports = router;
